import { Router } from 'express'
import { holaRouter } from '@/api/hola'

export const api = () => {
  const router = Router()

  router.use('/hola', holaRouter)

  return router
}
