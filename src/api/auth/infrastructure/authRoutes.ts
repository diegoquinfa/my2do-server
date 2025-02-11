import { NextFunction, Request, Response, Router } from 'express'
import { authContainer } from './authContainer'
import { success } from '@/network/response'

const authRoutes = Router()

authRoutes.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const register = req.body

  try {
    await authContainer.register.run(register)
    success(res, 'User successfully created', 201)
  } catch (err) {
    if (err instanceof Error) {
      next(err)
    }
  }
})

authRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body

  try {
    const loginResponse = await authContainer.login.run(login)
    success(res, 'User successfully logged', 200, loginResponse)
  } catch (err) {
    if (err instanceof Error) {
      next(err)
    }
  }
})

export { authRoutes }
