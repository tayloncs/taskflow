import styled from 'styled-components'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: boolean
  errorMessage?: string
  register?: any
}

const Input = (props: Props) => {
  const { label, errorMessage, error, register, ...inputProps } = props
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputStyled {...inputProps} {...register} $error={error} />
      <ErrorMessage>{error && errorMessage}</ErrorMessage>
    </InputWrapper>
  )
}

export default Input

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`

const Label = styled.label`
  width: 100%;
  margin-bottom: 0.3rem;
  text-align: left;
`

const InputStyled = styled.input<{ $error?: boolean }>`
  padding: 10px;
  border: 1px solid ${props => (props.$error ? 'red' : '#ccc')};
  border-radius: 4px;
`
const ErrorMessage = styled.p`
  width: 100%;
  margin: 0;
  color: red;
  font-size: 0.8rem;
  height: 22px;
`
