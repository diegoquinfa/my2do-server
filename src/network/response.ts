import { Response } from 'express'

const success = (res: Response, message: string, status: number = 200, data: unknown = null) => {
  const response = {
    success: true,
    message: message || 'Success',
    data
  }

  res.status(status).json(response)
}

const error = (res: Response, message: string, status: number = 500, details?: unknown) => {
  const response = {
    success: false,
    message,
    details
  }

  res.status(status).json(response)
}

export const response = {
  success,
  error
}
