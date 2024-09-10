import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { CreateTaskRequest } from './request/create-task.request'
import { UpdateTaskRequest } from './request/update-task.request'
import { TaskService } from './task.service'
import { CurrentUser, CurrentUserDto } from 'src/auth/current-user.decorator'
import { FindAllTaskResponse } from './response/find-all-task.response'

@ApiBearerAuth('access-token')
@ApiTags('Task')
@Controller('api/v1/task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskRequest: CreateTaskRequest, @CurrentUser() user: CurrentUserDto) {
    return await this.taskService.createTask(createTaskRequest.name, user.username, createTaskRequest.description)
  }

  @ApiOkResponse({
    description: 'Retorna todas tasks do usuario',
    type: FindAllTaskResponse,
    isArray: true,
  })
  @Get()
  findAll(@CurrentUser() user: CurrentUserDto) {
    return this.taskService.getAllTasks(user.username)
  }

  @Patch(':name')
  update(@Param('name') nameTask: string, @Body() updateTaskRequest: UpdateTaskRequest, @CurrentUser() user: CurrentUserDto) {
    return this.taskService.updateTask(nameTask, user.username, updateTaskRequest.name, updateTaskRequest.description, updateTaskRequest.status)
  }

  @Delete(':name')
  remove(@Param('name') name: string, @CurrentUser() user: CurrentUserDto) {
    return this.taskService.deleteTask(name, user.username)
  }
}
