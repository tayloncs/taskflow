import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from 'src/repositories/user/entities/user.entity'
import { IUserRepository } from 'src/repositories/user/user.repository'
import { UserResponse } from './response/user.response'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(
    name: string,
    userName: string,
    password: string,
  ): Promise<
    | UnauthorizedException
    | {
        accessToken: string
      }
  > {
    const userCrypto = await this.authService.getPasswordCrypto(userName, password)

    try {
      await this.userRepository.create({
        name,
        userName: userCrypto.userName,
        password: userCrypto.password,
      })
    } catch (error) {
      new HttpException('Nome de Usuario ja existe', HttpStatus.BAD_REQUEST)
    }

    return await this.authService.validateUser(userName, password, userCrypto.password)
  }

  async loginUser(
    userName: string,
    password: string,
  ): Promise<
    | UnauthorizedException
    | {
        accessToken: string
      }
  > {
    const user = await this.userRepository.findOneOrFailByUserName(userName)
    if (user) {
      user.password
      return await this.authService.validateUser(userName, password, user.password)
    } else {
      throw new NotFoundException('Not found user')
    }
  }

  async updateUser(userName: string, newName?: string, newPasword?: string): Promise<void> {
    await this.userRepository.update(
      userName,

      {
        name: newName,
        password: newPasword,
      },
    )
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async getUser(userName: string): Promise<UserResponse | void> {
    const user = await this.userRepository.findOneOrFailByUserName(userName)

    return plainToInstance(UserResponse, user, { excludeExtraneousValues: true })
  }

  async deleteUser(userName: string): Promise<void> {
    return this.userRepository.delete(userName)
  }
}
