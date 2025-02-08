import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { api } from './network/routes'
import { bootstrap } from './lib/bootstrap'
import { errorHanler } from './middlewares/errorHandler'
import { logger } from './middlewares/logger'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(logger)

app.use('/api/v1', api())

app.use(errorHanler)

bootstrap(app)
