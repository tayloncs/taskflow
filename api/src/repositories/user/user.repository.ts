import { Repository, TypeORMError } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { filterEmpty } from "src/utils/utils";
import { UserEntity } from "./entities/user.entity";

interface paramsUser {
  userName: string;
  name: string;
  password: string;
}

interface updateUser {
  name?: string;
  password?: string;
}

export abstract class IUserRepository {
  abstract create({
    userName,
    name,
    password,
  }: paramsUser): Promise<UserEntity>;
  abstract update(userName: string, newUser: updateUser): Promise<void>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findById(id: number): Promise<UserEntity>;
  abstract delete(userName: string): Promise<void>;
  abstract findOneOrFailByUserName(
    userName: string,
  ): Promise<UserEntity | void>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private typeOrmRepo: Repository<UserEntity>,
  ) {}

  async create(params: paramsUser): Promise<UserEntity> {
    const task = await this.typeOrmRepo
      .save(params)
      .catch((err: TypeORMError) => {
        throw new Error(err.message);
      });
    return task;
  }

  async update(userName: string, newUser: updateUser): Promise<void> {
    const updatedData: Partial<UserEntity> = filterEmpty(newUser);

    const taskSave = await this.typeOrmRepo
      .update({ userName }, updatedData)
      .catch((err) => {
        throw new Error(err.message);
      });

    if (!taskSave.affected) {
      throw new Error("Not find User");
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return this.typeOrmRepo.find({
      select: ["id", "name", "userName", "createdAt", "updatedAt"],
    });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }

  async findOneOrFailByUserName(userName: string): Promise<UserEntity | void> {
    return await this.typeOrmRepo
      .findOneOrFail({ where: { userName } })
      .catch((err) => {
        new NotFoundException("Not found user");
      });
  }

  async delete(userName: string): Promise<void> {
    await this.typeOrmRepo.delete({ userName });
  }
}
