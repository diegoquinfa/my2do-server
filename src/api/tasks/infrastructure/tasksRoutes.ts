import { NextFunction, Request, Response, Router } from 'express'
import { taskContainer } from './tasksContainer'
import { response } from '@/network/response'

const tasksRoutes = Router()

tasksRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body

  try {
    await taskContainer.createTask.run(task)
    response.success(res, 'Success', 201)
  } catch (err) {
    next(err)
  }
})

export { tasksRoutes }
