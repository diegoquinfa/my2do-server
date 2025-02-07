import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { api } from '@/network/routes'
import { bootstrap } from '@/lib/bootstrap'
import { errorHanler } from '@/middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use('/api/v1', api())

app.use(errorHanler)

bootstrap(app)
