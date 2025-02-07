import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { api } from '@/network/routes'
import { PORT } from '@/lib/env'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use('/api/v1', api())

app.listen(PORT, () => console.log('Server run on http://localhost:' + PORT))
