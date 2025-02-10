import { NextFunction, Request, Response, Router } from 'express'
import { authContainer } from './authContainer'
import { success } from '@/network/response'

const authRoutes = Router()

authRoutes.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const register = req.body

    try {
      await authContainer.register.run(register)
    } catch (err) {
      if (err instanceof Error) {
        next(err)
        return
      }
    }

    success(res, 'User successfuly created', 201)
  }
)

export { authRoutes }
