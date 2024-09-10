import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { ITaskRepository } from 'src/repositories/task/task.repository'
import { FindAllTaskResponse } from './response/find-all-task.response'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(name: string, userName: string, description?: string): Promise<void> {
    await this.taskRepository
      .create({
        name,
        userName,
        description,
      })
      .catch(() => {
        new HttpException('Nome de Tarefa ja existe', HttpStatus.BAD_REQUEST)
      })
  }

  async updateTask(name: string, userName: string, newName?: string, newDescription?: string, newStatus?: boolean): Promise<void> {
    await this.taskRepository.update(
      {
        name,
        userName,
      },
      {
        name: newName,
        description: newDescription,
        resolved: newStatus,
      },
    )
  }

  async getAllTasks(userName: string): Promise<FindAllTaskResponse[]> {
    const listTask = await this.taskRepository.findAll(userName)
    return plainToInstance(FindAllTaskResponse, listTask[0], { excludeExtraneousValues: true })
  }
  async deleteTask(name: string, userName): Promise<void> {
    return this.taskRepository.delete(name, userName)
  }
}
