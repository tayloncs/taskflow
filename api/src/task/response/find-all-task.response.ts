import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class FindAllTaskResponse {
  @ApiProperty({ description: 'Nome da task', example: 'Estudar' })
  @Expose()
  name: string
  @ApiProperty({ description: 'Descrição da task', example: 'Matematica' })
  @Expose()
  description: string
  @ApiProperty({ description: 'Status da task', example: 'true' })
  @Expose()
  resolved: boolean
}
