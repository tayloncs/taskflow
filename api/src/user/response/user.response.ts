import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponse {
  @ApiProperty({
    description: 'Nome completo do usuario',
    example: 'João Paulo',
  })
  @Expose()
  name: string

  @ApiProperty({ description: 'Nome unico de usuario', example: 'jam' })
  @Expose()
  userName: string
}
