import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './Button'
import Input from './Input'
const required_error = 'Campo Obrigatorio'
const loginSchema = z.object({
  userName: z.string({ required_error }).min(2, 'Nome de usuario teve ter minimo 3 letras').max(100, 'Nome teve ter maximo 100 letras'),
  password: z.string({ required_error }).min(4, 'Nome teve ter minimo 4 letras').max(15, 'Nome teve ter maximo 15 letras'),
})
type LoginSchema = z.infer<typeof loginSchema>
interface Props {
  onSubmit: (data: LoginSchema) => void
}
const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Input
        type="text"
        label="Nome de usuario"
        register={register('userName')}
        error={!!errors.userName}
        errorMessage={errors?.userName?.message?.toString()}
      />
      <Input
        type="password"
        label="Senha"
        register={register('password')}
        error={!!errors.password}
        errorMessage={errors?.password?.message?.toString()}
      />
      <Button type="submit">Entrar</Button>
    </form>
  )
}
export default LoginForm
