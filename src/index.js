import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { api } from './network/routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use('/api/v1', api())

app.listen(3000, () => console.log('Server run on http://localhost:3000'))
