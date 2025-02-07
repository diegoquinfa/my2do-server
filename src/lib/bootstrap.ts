import type { Express } from 'express'
import { ENV } from './env'

export const bootstrap = (app: Express) => {
  app.listen(ENV.PORT, () => console.log('Listening'))
}
