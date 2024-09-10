import { createContext, useContext, useEffect, useState } from 'react'
import { fetchUser, updateToken } from '../service/api'
import { useCookies } from 'react-cookie'
type User = {
  name?: string
  token?: string
}

type Alert = {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
}

type SetNewUser = (user: User) => void
type CreateAlert = (alert: Alert) => void

const init = {
  user: {
    name: undefined,
    token: undefined,
  } as User,
  setNewUser: (() => undefined) as SetNewUser,
  alert: {
    type: 'info',
    message: '',
  } as Alert,
  createAlert: (() => undefined) as CreateAlert,
}

const AppContext = createContext(init)

const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(init.user)
  const [alert, setAlert] = useState<Alert>(init.alert)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  function setNewUser(user: User) {
    setUser(user)
    updateToken(user.token || '')
    setCookie('token', user?.token)
  }

  function createAlert(alert: Alert) {
    setAlert(alert)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setNewUser,
        alert,
        createAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { ContextProvider, useAppContext }
