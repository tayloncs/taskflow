import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useAppContext } from '../provider/ContextProvider'
import { createUser, login } from '../service/api'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')

  const useApp = useAppContext()
  const navigate = useNavigate()

  async function handleLoginSubmit(data: { userName: string; password: string }) {
    const response = await login(data.userName, data.password)
    createToken({ ...response, name: data.userName })
  }

  async function handleRegisterSubmit(data: { name: string; password: string; userName: string }) {
    const response = await createUser(data.name, data.userName, data.password)
    createToken({ ...response, name: data.name })
  }

  function createToken(response: { accessToken?: string; messageError?: string; name: string }) {
    if (response.messageError) {
      useApp.createAlert({ message: response.messageError, type: 'error' })
    } else {
      useApp.setNewUser({ name: response.name, token: response.accessToken })
      navigate('/task')
    }
  }

  return (
    <Container>
      <FormWrapper>
        <Tabs>
          <Tab $active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
            Login
          </Tab>
          <Tab $active={activeTab === 'register'} onClick={() => setActiveTab('register')}>
            Novo Usuario
          </Tab>
        </Tabs>
        {activeTab === 'login' ? <LoginForm onSubmit={handleLoginSubmit} /> : <RegisterForm onSubmit={handleRegisterSubmit} />}
      </FormWrapper>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 60%;
  min-width: 30%;
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`

const Tab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  background: ${props => (props.$active ? '#007BFF' : 'transparent')};
  color: ${props => (props.$active ? 'white' : '#007BFF')};
  border: none;
  padding: 10px;
  border-radius: 4px;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: ${props => (!props.$active ? '#f0f0f0' : '#007BFF')};
  }
`
