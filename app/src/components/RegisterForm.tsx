import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './Button'
import Input from './Input'

const required_error = 'Campo Obrigatorio'

const registerSchema = z.object({
  userName: z.string({ required_error }).min(2, 'Nome de usuario teve ter minimo 3 letras').max(100, 'Nome teve ter maximo 100 letras'),
  name: z.string({ required_error }).min(6, 'Nome teve ter minimo 3 letras').max(100, 'Nome teve ter maximo 100 letras'),
  password: z.string({ required_error }).min(4, 'Nome teve ter minimo 4 letras').max(15, 'Nome teve ter maximo 15 letras'),
})
type RegisterSchema = z.infer<typeof registerSchema>
interface Props {
  onSubmit: (data: RegisterSchema) => void
}
const RegisterForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Input
        type="text"
        label="Nome de usuario"
        register={register('userName')}
        error={!!errors?.userName}
        errorMessage={errors?.userName?.message?.toString()}
      />
      {}
      <Input type="text" label="Nome Completo" register={register('name')} error={!!errors?.name} errorMessage={errors?.name?.message?.toString()} />
      <Input
        type="password"
        label="Senha"
        register={register('password')}
        error={!!errors?.password}
        errorMessage={errors?.password?.message?.toString()}
      />

      <Button type="submit">Cadastrar</Button>
    </form>
  )
}
export default RegisterForm
