import { Router } from 'express'
import { holaRouter } from '../api/hola/hola.network.js'

export const api = () => {
  const router = Router()

  router.use('/hola', holaRouter)

  return router
}
