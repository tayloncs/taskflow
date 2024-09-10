import { Repository, TypeORMError } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskEntity } from './entities/task.entity'
import { filterEmpty } from 'src/utils/utils'

interface paramsTask {
  name: string
  userName: string
  description?: string
}

interface updateTask {
  name?: string
  description?: string
  resolved?: boolean
}

export abstract class ITaskRepository {
  abstract create({ name, userName, description }: paramsTask): Promise<TaskEntity>
  abstract update(task: paramsTask, newTask: updateTask): Promise<void>
  abstract findAll(userName: string): Promise<[TaskEntity[], number]>
  abstract findById(id: number): Promise<TaskEntity>
  abstract delete(name: string, userName: string): Promise<void>
}

@Injectable()
export class TaskTypeOrmRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private typeOrmRepo: Repository<TaskEntity>,
  ) {}

  async create(params: paramsTask): Promise<TaskEntity> {
    const task = await this.typeOrmRepo.save(params).catch((err: TypeORMError) => {
      throw new Error(err.message)
    })
    return task
  }

  async update(task: paramsTask, newTask: updateTask): Promise<void> {
    const updatedData: Partial<TaskEntity> = filterEmpty(newTask)

    const taskSave = await this.typeOrmRepo.update({ name: task.name, userName: task.userName }, updatedData).catch(err => {
      throw new Error(err.message)
    })

    if (!taskSave.affected) {
      throw new Error('Not find Task')
    }
  }

  async findAll(userName: string): Promise<[TaskEntity[], number]> {
    return this.typeOrmRepo.findAndCountBy({ userName })
  }

  async findById(id: number): Promise<TaskEntity> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } })
  }

  async findByName(name: string, userName: string): Promise<TaskEntity> {
    return await this.typeOrmRepo.findOneOrFail({ where: { name, userName } })
  }

  async delete(name: string, userName: string): Promise<void> {
    await this.typeOrmRepo.delete({ name, userName })
  }
}
