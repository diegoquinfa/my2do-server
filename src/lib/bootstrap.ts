import type { Express } from 'express'
import { ENV } from './env'
import { Database } from '@/database/mongo'

export const bootstrap = async (app: Express) => {
  try {
    console.log('Starting server.')
    console.log('Connecting to database...')
    await Database.connect()
    app.listen(ENV.PORT, () => console.log('Listening'))
  } catch (err) {
    console.log(err)
    console.log('Exit program')
  }
}
