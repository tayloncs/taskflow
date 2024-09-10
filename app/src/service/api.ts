import axios, { AxiosInstance } from 'axios'

const url = import.meta.env.VITE_API_URL

const instance: AxiosInstance = axios.create({
  baseURL: url,
  timeout: 1000,
})

export function updateToken(token: string) {
  const authorizationHeader = `Bearer ${token}`
  instance.defaults.headers.common['Authorization'] = authorizationHeader
}

export async function login(userName: string, password: string): Promise<{ accessToken?: string; messageError?: string }> {
  try {
    const response = await instance.post(`v1/user/login`, {
      userName,
      password,
    })

    return response?.data
  } catch (error: any) {
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function createUser(name: string, userName: string, password: string): Promise<{ accessToken?: string; messageError?: string }> {
  try {
    instance.defaults.baseURL
    const response = await instance.post(`v1/user/create`, {
      name,
      userName,
      password,
    })

    return response?.data
  } catch (error: any) {
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function fetchUser(): Promise<{ data?: { name: string }; messageError?: string }> {
  try {
    const response = await instance.get(`v1/user/valid`)
    return { data: response.data }
  } catch (error: any) {
    if (error.response.data.statusCode === 401) {
      return { messageError: 'Unauthorized' }
    }
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function createTask(name: string, description: string): Promise<{ status?: boolean; messageError?: string }> {
  try {
    const response = await instance.post(`v1/task`, {
      name,
      description,
    })
    return { status: response.status === 200 }
  } catch (error: any) {
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function fetchTask(): Promise<{ data?: any[]; messageError?: string }> {
  try {
    const response = await instance.get(`v1/task`)

    return { data: response.data }
  } catch (error: any) {
    if (error.response.data.statusCode === 401) {
      return { messageError: 'Unauthorized' }
    }
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function updateTask(data: { nameTask: string; newNameTask?: string; newDescription?: string; newStatus?: boolean }) {
  try {
    const response = await instance.patch(`v1/task/${data.nameTask}`, {
      name: data.newNameTask,
      description: data.newDescription,
      status: data.newStatus,
    })

    return { status: response.status === 200 }
  } catch (error: any) {
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}

export async function deleteTask(nameTask: string) {
  try {
    const response = await instance.delete(`v1/task/${nameTask}`)

    return { status: response.status === 200 }
  } catch (error: any) {
    const message = error.response.data.message
    return { messageError: Array.isArray(message) ? message[0] : message }
  }
}
