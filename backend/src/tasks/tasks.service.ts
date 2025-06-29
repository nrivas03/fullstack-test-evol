import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { Op } from 'sequelize';
import { TagsService } from 'src/tags/tags.service';

/**
 * Type for filtering tasks.
 * - completed: true or false
 * - dueDate: filters tasks due on or before this date
 * - tags: filters tasks that are associated with these tag names
 */
interface TaskFilter {
  completed?: boolean;
  dueDate?: Date;
  tags?: string[];
}

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Creates a new task with optional tags and due date.
   * - Tags are processed to find or create them in the database.
   * - Due date is converted to a Date object if provided.
   *
   * @param createTaskDto - Data transfer object containing task details.
   * @returns Promise<Task> - The created Task entity with associated tags.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { tags, dueDate, ...taskData } = createTaskDto;
    const tagInstances = tags?.length
      ? await this.tagsService.findOrCreateMany(tags)
      : [];

    const task = await this.taskModel.create({
      ...taskData,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    if (tagInstances.length) await task.$set('tags', tagInstances);

    const foundTask = await this.taskModel.findByPk(task.id as number, {
      include: [this.buildTagInclude()],
    });
    if (!foundTask) {
      throw new Error('Task not found after creation');
    }
    return foundTask;
  }

  /**
   * Retrieves all tasks from the database, including associated tags.
   * - Tags are included with only id and name fields.
   *
   * @returns Promise<Task[]> - List of all tasks with their tags.
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll({
      include: [this.buildTagInclude()],
    });
  }

  /**
   * Toggles the 'completed' status of a task by its ID.
   *
   * @param id - The unique identifier of the task to update.
   * @returns A promise that resolves to the updated Task instance with its 'completed' status toggled.
   * @throws Error if the task with the specified ID is not found.
   */
  async toggleStatus(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const currentValue = task.dataValues.completed ?? false;
    const newValue = !currentValue;

    task.set('completed', newValue);
    await task.save();

    const updatedTask = await this.taskModel.findByPk(id, {
      include: [this.buildTagInclude()],
    });

    return updatedTask!;
  }

  /**
   * Retrieves tasks based on optional filters:
   * - completed: true or false
   * - dueDate: limits tasks to those with dueDate <= given date
   * - tags: filters tasks that include ALL specified tags
   *
   * If tags are provided, an INNER JOIN is used (required = true).
   * Otherwise, tags are included optionally.
   *
   * @param filter - TaskFilter object with optional fields.
   * @returns Promise<Task[]> - List of filtered tasks with tag info.
   */
  async findAllFiltered(filter: TaskFilter): Promise<Task[]> {
    const { completed, dueDate, tags } = filter;

    const whereClause: Record<string, any> = {};
    if (completed !== undefined) whereClause.completed = completed;
    if (dueDate) whereClause.dueDate = { [Op.lte]: dueDate };

    return this.taskModel.findAll({
      where: whereClause,
      include: [this.buildTagInclude(tags)],
    });
  }

  /**
   * Helper function to construct Sequelize include configuration
   * for the many-to-many relation with tags.
   * - Includes only tag 'id' and 'name'.
   * - Optionally filters by tag names and forces INNER JOIN when required.
   *
   * @param tags - Optional list of tag names to filter.
   * @param required - Whether the JOIN should be required (INNER JOIN).
   * @returns Sequelize include clause for Task.findAll or findByPk
   */
  private buildTagInclude(tags?: string[], required = false) {
    return {
      model: Tag,
      attributes: ['id', 'name'],
      through: { attributes: [] },
      ...(tags && tags.length > 0
        ? {
            where: { name: { [Op.in]: tags } },
            required: true,
          }
        : {
            required,
          }),
    };
  }
}
