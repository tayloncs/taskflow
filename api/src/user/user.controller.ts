import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { CreateUserRequest } from './request/create-user.resquest'
import { UpdateUserRequest } from './request/update-user.resquest'
import { UserService } from './user.service'
import { CurrentUser, CurrentUserDto } from 'src/auth/current-user.decorator'
import { LoginRequest } from './request/login-user.request'

@ApiCookieAuth()
@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.createUser(createUserRequest.name, createUserRequest.userName, createUserRequest.password)
  }

  @Post('login')
  async login(@Body() createUserRequest: LoginRequest) {
    return this.userService.loginUser(createUserRequest.userName, createUserRequest.password)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.getAllUsers()
  }

  @UseGuards(JwtAuthGuard)
  @Get('valid')
  findUser(@CurrentUser() user: CurrentUserDto) {
    return this.userService.getUser(user.username)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateUserRequest: UpdateUserRequest) {
    return this.userService.updateUser(updateUserRequest.name, updateUserRequest.userName, updateUserRequest.password)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userName')
  remove(@Param('userName') userName: string) {
    this.userService.deleteUser(userName)
  }
}
