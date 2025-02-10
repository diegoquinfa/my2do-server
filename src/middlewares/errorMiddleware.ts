import { ErrorRequestHandler } from 'express'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { error } from '@/network/response'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.err = err
  if (req.path?.startsWith('/api')) {
    if (err instanceof ValidationError) {
      error(res, err.message, err.details, err.statusCode)
      return
    }

    if (err instanceof DatabaseError) {
      error(res, 'Service unavailable', null, err.statusCode)
      return
    }

    error(res, 'Something went wrong')
  }

  next()
}
