import { Router } from 'express'

const holaRouter = Router()

holaRouter.get('/', (_, res) => {
  res.json({ hola: 'mundo' })
})

export { holaRouter }
