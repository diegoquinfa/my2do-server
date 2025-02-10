import { taskRoutes } from '@/api/tasks/infrastructure/tasksRoutes'
import { Router } from 'express'

export const api = () => {
  const router = Router()

  router.use('/tasks', taskRoutes)

  return router
}
