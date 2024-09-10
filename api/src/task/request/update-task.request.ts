import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class UpdateTaskRequest {
  @ApiProperty({ description: 'Nome da task', example: 'Estudar' })
  @IsOptional()
  @IsString({ message: 'Nome teve ser string' })
  @Length(3, 100, { message: 'Nome teve ter entre 5 e 100 caracteres' })
  name: string

  @ApiProperty({ description: 'Descrição da task', example: 'Matematica' })
  @IsOptional()
  @IsString({ message: 'Description teve ser string' })
  @Length(5, 200, { message: 'Description teve ter entre 5 e 200 caracteres' })
  description?: string

  @ApiProperty({ description: 'Status da task', example: 'true' })
  @IsOptional()
  @IsBoolean({ message: 'Status teve ser boolean' })
  status: boolean
}
