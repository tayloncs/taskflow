import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateTaskRequest {
  @ApiProperty({ description: 'Nome da nova task', example: 'Estudar' })
  @IsString({ message: 'Nome teve ser string' })
  @Length(3, 100, { message: 'Nome teve ter entre 3 e 100 caracteres' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string

  @ApiProperty({
    description: 'Descrição da nova task',
    example: 'Nestjs - Node',
  })
  @IsOptional()
  @IsString({ message: 'Description teve ser string' })
  @Length(5, 200, { message: 'Description teve ter entre 5 e 200 caracteres' })
  description?: string
}
