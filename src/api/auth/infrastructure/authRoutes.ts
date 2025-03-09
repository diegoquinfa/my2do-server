import { NextFunction, Request, Response, Router } from 'express'
import { authContainer } from './authContainer'
import { response } from '@/network/response'
import { ENV } from '@/lib/env'

const authRoutes = Router()

authRoutes.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const register = req.body

  try {
    await authContainer.register.run(register)
    response.success(res, 'User successfully created', 201)
  } catch (err) {
    next(err)
  }
})

authRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body

  try {
    const loginResponse = await authContainer.login.run(login)

    res.cookie('auth', `Bearer ${loginResponse.jwt}`, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    response.success(res, 'User successfully logged', 200, { ...loginResponse, jwt: undefined })
  } catch (err) {
    next(err)
  }
})

export { authRoutes }
