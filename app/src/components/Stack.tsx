import styled from 'styled-components'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  row?: boolean
}

const Stack = ({ row, ...props }: Props) => {
  return (
    <Container $row={row} {...props}>
      {props.children}
    </Container>
  )
}

export default Stack

const Container = styled.div<{ $row?: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$row ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
