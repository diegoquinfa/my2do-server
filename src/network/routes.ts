import { authRoutes } from '@/api/auth/infrastructure/authRoutes'
import { tasksRoutes } from '@/api/tasks/infrastructure/tasksRoutes'
import { Router } from 'express'

export const api = () => {
  const router = Router()

  router.use('/tasks', tasksRoutes)
  router.use('/auth', authRoutes)

  return router
}
