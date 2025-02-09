import { NextFunction, Request, Response } from 'express'

export const errorHanler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction // eslint-disable-line
) => {
  res.err = err

  if (req.path?.startsWith('/api')) {
    res.status(500).json({
      error: 'something was wrong'
    })
  }
}
