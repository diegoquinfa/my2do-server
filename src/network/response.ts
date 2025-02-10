import { Response } from 'express'

export const success = (
  res: Response,
  data: unknown,
  message: string,
  status = 200
) => {
  const response = {
    success: true,
    message: message || 'Success',
    data
  }

  res.status(status).json(response)
}

export const error = (
  res: Response,
  message: string,
  details?: unknown,
  status = 500
) => {
  const response = {
    success: false,
    message,
    details
  }

  res.status(status).json(response)
}
