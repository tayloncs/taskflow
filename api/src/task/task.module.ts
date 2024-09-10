import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ITaskRepository,
  TaskTypeOrmRepository,
} from "src/repositories/task/task.repository";
import { TaskEntity } from "../repositories/task/entities/task.entity";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: ITaskRepository,
      useClass: TaskTypeOrmRepository,
    },
  ],
})
export class TaskModule {}
