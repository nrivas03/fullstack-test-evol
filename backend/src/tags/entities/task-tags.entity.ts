import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';
import { Tag } from './tag.entity';

@Table
export class TaskTags extends Model<TaskTags> {
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
