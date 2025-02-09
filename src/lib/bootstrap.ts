import type { Express } from 'express'
import { ENV } from './env'
import { Database } from '@/database/mongo'

export const bootstrap = async (app: Express) => {
  await Database.connect()

  app.listen(ENV.PORT, () => console.log('Listening'))
}
