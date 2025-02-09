import { ErrorRequestHandler } from 'express'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { ValidationError } from '@/shared/application/errors/ValidationError'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (req.path?.startsWith('/api')) {
    if (err instanceof ValidationError) {
      res.status(err.statusCode).json({
        error: err.message,
        details: err.details
      })
      return
    }

    if (err instanceof DatabaseError) {
      res.status(err.statusCode).json({
        error: 'Service unavailable'
      })
      return
    }

    res.status(500).json({
      error: 'something was wrong'
    })
  }

  next()
}
