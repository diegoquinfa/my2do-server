import type { Express } from 'express'
import { ENV } from './env'
import { Database } from '@/database/mongo'
import { logger } from './logger'

export const bootstrap = async (app: Express) => {
  try {
    await Database.connect()
    app.listen(ENV.PORT, () => console.log('Listening'))
  } catch (err) {
    logger.fatal(err)
    console.log('Exit program')
  }
}
