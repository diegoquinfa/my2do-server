import type { Express } from 'express'
import { ENV } from './env'
import { connectDataBase } from '@/repository/mongo'

export const bootstrap = async (app: Express) => {
  await connectDataBase()
  app.listen(ENV.PORT, () => console.log('Listening'))
}
