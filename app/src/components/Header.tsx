import styled from 'styled-components'
import Button from './Button'

interface Props {
  onLogout: () => void
}

const Header = (props: Props) => {
  return (
    <HeaderStyled>
      <Text>TaskFlow</Text>
      <div>
        <Button onClick={props.onLogout}>logout</Button>
      </div>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  background-color: #1883f5;
  height: 40px;
`

const Text = styled.div`
  font-size: 1%.5;
  font-weight: 700;
  margin-left: 20px;
  text-align: start;
`
