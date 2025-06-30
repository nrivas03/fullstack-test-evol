import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query('completed') completed?: string,
    @Query('dueDate') dueDate?: string,
    @Query('tags') tags?: string,
    @Query('sort') sort?: 'dueDate' | 'createdAt' | 'title',
    @Query('title') title?: string,
  ): Promise<Task[]> {
    const filter = {
      completed: completed === undefined ? undefined : completed === 'true',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags ? tags.split(',') : undefined,
      sort,
      title,
    };

    return await this.tasksService.findAllFiltered(filter);
  }

  @Patch('toggle/:id')
  async toggleStatus(@Param('id') id: number): Promise<Task> {
    return await this.tasksService.toggleStatus(id);
  }
}
