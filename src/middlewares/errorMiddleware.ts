import { ErrorRequestHandler } from 'express'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { response } from '@/network/response'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.err = err
  if (req.path?.startsWith('/api')) {
    if (err instanceof ValidationError) {
      response.error(res, err.message, err.statusCode, err.details)
      return
    }

    if (err instanceof DatabaseError) {
      response.error(res, 'Service unavailable', err.statusCode)
      return
    }

    // TODO: - Add more cases

    response.error(res, 'Something went wrong')
  }

  next()
}
