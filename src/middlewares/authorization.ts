import { jwt } from '@/lib/jtw'
import { response } from '@/network/response'
import { NextFunction, Request, Response } from 'express'

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req.cookies

  if (!auth || typeof auth !== 'string') {
    response.error(res, 'Unauthorized', 401)
    return
  }

  const bearerToken = /^Bearer\s+(.+)$/
  if (bearerToken.test(auth)) {
    const token = auth.split(' ').at(-1)

    if (!token || typeof token !== 'string') {
      response.error(res, 'Unauthorized', 401)
      return
    }

    const payload = jwt.verifyJWT(token)

    if (!payload) {
      response.error(res, 'Unauthorized', 401)
      return
    }

    req.query.authUser = payload

    next()
  }
}
