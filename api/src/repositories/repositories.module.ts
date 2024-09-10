import { Module } from "@nestjs/common";
import { ITaskRepository, TaskTypeOrmRepository } from "./task/task.repository";

@Module({
  providers: [TaskTypeOrmRepository],
  exports: [ITaskRepository],
})
export class RepositoriesModule {}
