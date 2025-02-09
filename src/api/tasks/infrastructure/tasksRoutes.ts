import { NextFunction, Request, Response, Router } from 'express'
import { taskContainer } from './tasksContainer'

const taskRoutes = Router()

taskRoutes.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const task = req.body

    try {
      await taskContainer.createTask.run(task)
    } catch (err) {
      if (err instanceof Error) {
        return next(err)
      }
    }

    res.status(201).send('Creado')
  }
)

export { taskRoutes }
