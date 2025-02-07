import type { Express } from 'express'
import { PORT } from './env'

export const bootstrap = (app: Express) => {
  app.listen(PORT, () => console.log('Listening'))
}
