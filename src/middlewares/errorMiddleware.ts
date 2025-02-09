import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { NextFunction, Request, Response } from 'express'

export const errorHanler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction // eslint-disable-line
) => {
  res.err = err

  if (req.path?.startsWith('/api')) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        error: err.message,
        details: err.details
      })
    }

    if (err instanceof DatabaseError) {
      return res.status(err.statusCode).json({
        error: 'Service unavailable'
      })
    }

    res.status(500).json({
      error: 'something was wrong'
    })
  }
}
