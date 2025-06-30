import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';
import { TaskTags } from './task-tags.entity';

@Table
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Task, () => TaskTags)
  tasks: Task[];
}
