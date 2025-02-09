import { TaskCreate } from '../application/TaskCreate'
import { TasksRepository } from './TasksRespository'

const taskRepository = new TasksRepository()

export const taskContainer = {
  createTask: new TaskCreate(taskRepository)
}
