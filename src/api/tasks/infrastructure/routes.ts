import { Response, Router } from 'express'
import { createTask } from '../application/createTask'
import { TasksRepository } from './TasksRespository'

const taskRoutes = Router()

taskRoutes.get('/', (_, res: Response) => {
  const task = {
    title: 'hola',
    description: 'mundo'
  }

  createTask(task, new TasksRepository())

  res.status(201).send('Creado')
})

export { taskRoutes }
