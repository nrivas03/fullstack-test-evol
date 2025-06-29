import * as dotenv from 'dotenv';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Task } from 'src/tasks/entities/task.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TaskTags } from 'src/tags/entities/task-tags.entity';
dotenv.config();

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD?.toString() || 'postgres',
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  models: [Task, Tag, TaskTags],
};
