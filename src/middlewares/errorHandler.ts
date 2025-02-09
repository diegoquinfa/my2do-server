import { NextFunction, Request, Response } from 'express'

export const errorHanler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction // eslint-disable-line
) => {
  console.log(req.path)

  res.status(500).json({
    error: 'something was wrong'
  })

  console.log(err)
}
