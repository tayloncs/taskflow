import styled from 'styled-components'

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

const Button = (props: Props) => {
  return <ButtonStyled {...props} />
}

export default Button

const ButtonStyled = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`
