import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Stack from '../components/Stack'
import TaskForm from '../components/TaskForm'
import { useAppContext } from '../provider/ContextProvider'
import { createTask, deleteTask, fetchTask, updateTask } from '../service/api'
import { useNavigate } from 'react-router-dom'

type Task = {
  id: number
  name: string
  description: string
  resolved?: boolean
}

enum ActionType {
  EDIT = 'edit',
  CREATE = 'create',
  CLOSE = '',
}

const Task = () => {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [action, setAction] = useState<ActionType>(ActionType.CLOSE)
  const [selectTask, setSelectTask] = useState<Task>()

  const navigate = useNavigate()
  const useApp = useAppContext()

  useEffect(() => {
    loadTask()
  }, [])

  async function loadTask() {
    const response = await fetchTask()
    if (response.messageError) {
      if (response.messageError === 'Unauthorized') {
        useApp.setNewUser({ token: '' })
        navigate('/')
      } else {
        useApp.createAlert({ message: response.messageError, type: 'error' })
      }
    } else {
      setTaskList(response.data as Task[])
    }
  }

  async function handleToggle(nameTask: string, isResolved: boolean) {
    const response = await updateTask({
      nameTask,
      newStatus: isResolved,
    })
    if (response.messageError) {
      useApp.createAlert({ message: response.messageError, type: 'error' })
    } else {
      loadTask()
    }
  }

  async function handleRemove(nameTask: string) {
    const response = await deleteTask(nameTask)
    if (response.messageError) {
      useApp.createAlert({ message: response.messageError, type: 'error' })
    } else {
      loadTask()
    }
  }

  async function handleEdit(data: { name: string; description: string }) {
    if (selectTask?.name) {
      const response = await updateTask({
        nameTask: selectTask.name,
        newNameTask: data.name || selectTask.name,
        newDescription: data.description || selectTask.description,
      })
      if (response.messageError) {
        useApp.createAlert({ message: response.messageError, type: 'error' })
      } else {
        loadTask()
        setAction(ActionType.CLOSE)
      }
    }
  }

  async function handleCreate(data: { name: string; description: string }) {
    const response = await createTask(data.name, data.description)

    if (response.messageError) {
      useApp.createAlert({ message: response.messageError, type: 'error' })
    } else {
      loadTask()
      setAction(ActionType.CLOSE)
    }
  }

  function handleSelectEdit(task: Task) {
    setSelectTask(task)
    setAction(ActionType.EDIT)
  }

  return (
    <Container>
      <Title>Tarefas</Title>
      <Stack>
        <TaskList>
          {taskList.map((task, key) => (
            <TaskItem key={key} $completed={task.resolved}>
              <TaskStack style={{ justifyContent: 'flex-start' }}>
                <TaskCheckbox type="checkbox" checked={task?.resolved} onChange={() => handleToggle(task.name, !task.resolved)} />
                <TaskSession>
                  <TaskText $completed={task.resolved}>{task.name}</TaskText>
                  <TaskDescription>{task.description}</TaskDescription>
                </TaskSession>
              </TaskStack>
              <TaskAction>
                <EditButton onClick={() => handleSelectEdit(task)}>Editar</EditButton>
                <RemoveButton onClick={() => handleRemove(task.name)}>Deletar</RemoveButton>
              </TaskAction>
            </TaskItem>
          ))}
        </TaskList>
      </Stack>
      <Stack>
        {action === ActionType.CREATE && <TaskForm onSubmit={handleCreate} />}
        {action === ActionType.EDIT && <TaskForm onSubmit={handleEdit} defaultValues={selectTask} />}
        {action === ActionType.CLOSE && <Button onClick={() => setAction(ActionType.CREATE)}>Criar Tarefa</Button>}
      </Stack>
    </Container>
  )
}

export default Task

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 30%;
  max-height: 90%;
`

const TaskSession = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
`

const TaskStack = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  height: 100%;
  width: 100%;
`

const TaskAction = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  gap: 5px;
`

const Title = styled.h1`
  font-weight: bold;
`

const TaskList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`

const TaskItem = styled.li<{ $completed?: boolean }>`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: ${props => (props.$completed ? '#f0f8ff' : '#fff')};
`

const TaskText = styled.span<{ $completed?: boolean }>`
  text-decoration: ${props => (props.$completed ? 'line-through' : 'none')};
  margin-right: 5px;
`

const TaskDescription = styled.span`
  font-size: 0.8rem;
`

const TaskCheckbox = styled.input`
  margin-right: 10px;
`

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
`

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
`
