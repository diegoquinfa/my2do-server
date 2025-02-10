import { NextFunction, Request, Response, Router } from 'express'
import { taskContainer } from './tasksContainer'
import { success } from '@/network/response'

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

    success(res, null, 'Success', 201)
  }
)

export { taskRoutes }
