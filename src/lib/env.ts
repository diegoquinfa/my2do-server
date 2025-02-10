import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65536),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production'), z.literal('testing')])
    .default('development'),
  DB_URI: z.string(),
  DB_NAME: z.string()
})

export const ENV = envSchema.parse(process.env)
