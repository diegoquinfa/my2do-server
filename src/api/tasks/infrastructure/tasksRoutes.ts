import { NextFunction, Request, Response, Router } from 'express'
import { taskContainer } from './tasksContainer'
import { response } from '@/network/response'
import { authorization } from '@/middlewares/authorization'

const tasksRoutes = Router()

tasksRoutes.post('/', authorization, async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body
  const { authUser } = req.query

  try {
    await taskContainer.createTask.run(task, authUser)
    response.success(res, 'Success', 201)
    next()
  } catch (err) {
    next(err)
  }
})

export { tasksRoutes }
