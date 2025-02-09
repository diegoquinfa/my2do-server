import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { api } from './network/routes'
import { bootstrap } from './lib/bootstrap'
import { errorHanler } from './middlewares/errorMiddleware'
import { loggerMiddleware } from './middlewares/loggerMiddleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(loggerMiddleware)

app.use('/api/v1', api())

app.use(errorHanler)

bootstrap(app)
