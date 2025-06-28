import { Module } from '@nestjs/common';
import { sequelizeConfig } from './database/sequelize.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
