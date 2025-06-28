import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { Tag } from '../../tags/entities/tag.entity';
import { TaskTags } from '../../tags/entities/task-tags.entity';

export interface TaskCreationAttributes {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
}

@Table
export class Task extends Model<Task, TaskCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @Column(DataType.DATE)
  dueDate: Date;

  @BelongsToMany(() => Tag, () => TaskTags)
  tags: Tag[];
}
