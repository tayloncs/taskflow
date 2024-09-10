import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'
import Button from './Button'
import Input from './Input'

const required_error = 'Campo Obrigatorio'

const taskSchema = z.object({
  description: z.string().min(5, 'Descrição teve ter entre 5 e 100 caracteres').max(200, 'Descrição teve ter entre 5 e 100 caracteres'),
  name: z.string({ required_error }).min(3, 'Tarefa teve ter entre 3 e 100 caracteres').max(100, 'Tarefa teve ter entre 3 e 100 caracteres'),
})
type TaskSchema = z.infer<typeof taskSchema>

interface Props {
  onSubmit: (data: TaskSchema) => void
  defaultValues?: TaskSchema
}

const TaskForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: props.defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Container>
        <Input
          type="text"
          placeholder="Tarefa..."
          register={register('name')}
          error={!!errors.name}
          errorMessage={errors.name?.message?.toString()}
        />
        <Input
          type="text"
          placeholder="Descrição..."
          register={register('description')}
          error={!!errors.description}
          errorMessage={errors?.description?.message?.toString()}
        />

        <Button type="submit">Salvar Tarefa</Button>
      </Container>
    </form>
  )
}
export default TaskForm

const Container = styled.div<{ row?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  height: 100%;
  width: 100%;
`
