import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUserRequest {
  @ApiProperty({
    description: 'Nome completo do usuario',
    example: 'João Paulo',
  })
  @IsString({ message: 'Nome teve ser string' })
  @Length(3, 100, { message: 'Nome teve ter entre 5 e 100 caracteres' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string

  @ApiProperty({ description: 'Nome unico de usuario', example: 'jam' })
  @IsString({ message: 'UserName teve ser string' })
  @Length(3, 100, { message: 'UserName teve ter entre 5 e 100 caracteres' })
  @IsNotEmpty({ message: 'UserName não pode ser vazio' })
  userName: string

  @ApiProperty({ description: 'Senha de acesso', example: 'j1234' })
  @IsString({ message: 'Description teve ser string' })
  @Length(4, 15, { message: 'Description teve ter entre 5 e 200 caracteres' })
  password?: string
}
