import { Response } from 'express'

export const success = (
  res: Response,
  message: string,
  status: number = 200,
  data: unknown = null
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
  status: number = 500,
  details?: unknown
) => {
  const response = {
    success: false,
    message,
    details
  }

  res.status(status).json(response)
}
