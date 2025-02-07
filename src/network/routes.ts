import { taskRoutes } from '@/api/tasks/infrastructure/routes'
import { Router, Response } from 'express'

export const api = () => {
  const router = Router()

  router.use('/example', (_, res: Response) => {
    res.json({ hello: 'world' })
  })

  router.use('/task', taskRoutes)

  return router
}
