import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'task' })
@Index(['name', 'userName'], { unique: true })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  resolved: boolean

  @Column()
  userName: string

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt
}
