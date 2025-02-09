import { taskRoutes } from '@/api/tasks/infrastructure/routes'
import { Router } from 'express'

export const api = () => {
  const router = Router()

  router.use('/task', taskRoutes)

  return router
}
