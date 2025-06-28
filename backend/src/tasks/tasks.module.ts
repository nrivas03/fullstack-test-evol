import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [SequelizeModule.forFeature([Task]), TagsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
