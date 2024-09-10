import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class LoginRequest {
  @ApiProperty({
    description: 'UserName do usuario cadastrado',
    example: 'jam',
  })
  @IsString({ message: 'UserName teve ser string' })
  @Length(3, 100, { message: 'UserName teve ter entre 5 e 100 caracteres' })
  @IsNotEmpty({ message: 'UserName não pode ser vazio' })
  userName: string

  @ApiProperty({
    description: 'Senha de login',
    example: 'j1234',
  })
  @IsString({ message: 'Password teve ser string' })
  @Length(4, 15, { message: 'Password teve ter entre 5 e 200 caracteres' })
  @IsNotEmpty({ message: 'Password não pode ser vazio' })
  password: string
}
