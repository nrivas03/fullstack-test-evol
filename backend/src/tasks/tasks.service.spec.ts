import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TagsService } from '../tags/tags.service';

describe('TasksService', () => {
  let service: TasksService;
  let taskModel: any;
  let tagsService: any;

  beforeEach(async () => {
    taskModel = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
    };

    tagsService = {
      findOrCreateMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { provide: getModelToken(Task), useValue: taskModel },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { provide: TagsService, useValue: tagsService },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('should create a task with tags', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'desc',
        tags: ['urgent'],
        dueDate: new Date().toISOString(),
      };

      const fakeTagInstances = [{ id: 1, name: 'urgent' }];
      const fakeTask = {
        id: 1,
        $set: jest.fn(),
      };

      tagsService.findOrCreateMany.mockResolvedValue(fakeTagInstances);
      taskModel.create.mockResolvedValue(fakeTask);
      taskModel.findByPk.mockResolvedValue({
        ...fakeTask,
        tags: fakeTagInstances,
      });

      const result = await service.create(createTaskDto);

      expect(tagsService.findOrCreateMany).toHaveBeenCalledWith(['urgent']);
      expect(taskModel.create).toHaveBeenCalled();
      expect(fakeTask.$set).toHaveBeenCalledWith('tags', fakeTagInstances);
      expect(result.tags).toEqual(fakeTagInstances);
    });
  });

  it('should throw if task is not found after creation', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'desc',
      tags: ['urgent'],
      dueDate: new Date().toISOString(),
    };

    const fakeTask = {
      id: 1,
      $set: jest.fn(),
    };

    // tags mock
    tagsService.findOrCreateMany.mockResolvedValue([{ id: 1, name: 'urgent' }]);

    // create devuelve un task válido
    taskModel.create.mockResolvedValue(fakeTask);

    // findByPk devuelve null simulando un error
    taskModel.findByPk.mockResolvedValue(null);

    await expect(service.create(createTaskDto)).rejects.toThrow(
      'Task not found after creation',
    );
  });

  describe('findAll', () => {
    it('should return all tasks with tags', async () => {
      const tasks = [{ id: 1, title: 'task1', tags: [] }];
      taskModel.findAll.mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(taskModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('toggleStatus', () => {
    it('should toggle the completed status', async () => {
      const task = {
        id: 1,
        dataValues: { completed: false },
        set: jest.fn(),
        save: jest.fn(),
      };

      const updatedTask = { ...task, completed: true };

      taskModel.findByPk
        .mockResolvedValueOnce(task)
        .mockResolvedValueOnce(updatedTask);

      const result = await service.toggleStatus(1);

      expect(task.set).toHaveBeenCalledWith('completed', true);
      expect(result).toEqual(updatedTask);
    });

    it('should throw if task not found', async () => {
      taskModel.findByPk.mockResolvedValue(null);

      await expect(service.toggleStatus(99)).rejects.toThrow(
        'Task with id 99 not found',
      );
    });
  });

  describe('findAllFiltered', () => {
    it('should apply filters and return tasks', async () => {
      const filteredTasks = [{ id: 1, title: 'filtered task' }];
      taskModel.findAll.mockResolvedValue(filteredTasks);

      const result = await service.findAllFiltered({
        completed: false,
        title: 'filter',
        sort: 'createdAt',
      });

      expect(taskModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(filteredTasks);
    });
  });

  describe('update', () => {
    it('should update a task and tags', async () => {
      const task = {
        id: 1,
        update: jest.fn(),
        $set: jest.fn(),
      };

      const updatedTask = { ...task, title: 'updated', tags: [] };

      taskModel.findByPk
        .mockResolvedValueOnce(task)
        .mockResolvedValueOnce(updatedTask);

      tagsService.findOrCreateMany.mockResolvedValue([]);

      const result = await service.update(1, { title: 'updated', tags: [] });

      expect(task.update).toHaveBeenCalled();
      expect(result.title).toBe('updated');
    });

    it('should throw if task not found', async () => {
      taskModel.findByPk.mockResolvedValue(null);

      await expect(service.update(123, { title: 'fail' })).rejects.toThrow(
        'Task with id 123 not found',
      );
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const task = { id: 1, destroy: jest.fn() };
      taskModel.findByPk.mockResolvedValue(task);

      await service.remove(1);

      expect(task.destroy).toHaveBeenCalled();
    });

    it('should throw if task not found', async () => {
      taskModel.findByPk.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        'Task with id 999 not found',
      );
    });
  });
});
