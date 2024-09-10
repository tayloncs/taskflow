import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Alert from './components/Alert'
import Header from './components/Header'
import Stack from './components/Stack'
import Login from './pages/Login.page'
import Task from './pages/Task.page'
import { useAppContext } from './provider/ContextProvider'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Loading from './components/Load'
import styled from 'styled-components'
import { fetchUser, updateToken } from './service/api'
const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/task',
    element: (
      <PrivateRoute>
        <Task />
      </PrivateRoute>
    ),
  },
])

function PrivateRoute({ children }: any) {
  const [cookies, setCookie] = useCookies(['token'])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>()

  const useApp = useAppContext()

  const navigateTo = children ? children : <Navigate to="/task" />

  useEffect(() => {
    if (cookies?.token !== useApp.user.token) {
      updateToken(cookies?.token)
      loadUser()
    } else if (cookies?.token && useApp.user.token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [useApp.user.token])

  async function loadUser() {
    const response = await fetchUser()
    if (response.data) {
      useApp.setNewUser({
        name: response.data.name,
        token: cookies.token,
      })
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  if (isAuthenticated === undefined) {
    return <Loading />
  }
  return isAuthenticated ? navigateTo : <Navigate to="/login" />
}

function App() {
  const useApp = useAppContext()

  function handleLogout() {
    useApp.setNewUser({ token: '', name: '' })
  }

  return (
    <Container>
      <Header onLogout={handleLogout} />
      <Stack>
        <RouterProvider router={router} />
      </Stack>
      <Alert
        type={useApp.alert.type}
        message={useApp.alert.message}
        duration={5000}
        onChange={value => {
          !value && useApp.createAlert({ message: '' })
        }}
      />
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  justify-content: 'flex-start';
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`
