import 'dotenv/config'
import { z } from 'zod'

const stringNonempty = (message: string) => z.string().trim().nonempty({ message })

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production'), z.literal('testing')])
    .default('development')
    .refine((val) => ['development', 'production', 'testing'].includes(val), {
      message: "NODE_ENV must be 'development', 'production', or 'testing'"
    }),

  API_URL: stringNonempty('API_URL cannot be empty'),

  PORT: z.coerce
    .number()
    .min(1, { message: 'PORT must be a number between 1 and 65536' })
    .max(65536, { message: 'PORT must be a number between 1 and 65536' }),

  DB_URI: stringNonempty('DB_URI cannot be empty'),
  DB_NAME: stringNonempty('DB_NAME cannot be empty'),

  JWT_SECRET: stringNonempty('JWT_SECRET cannot be empty'),
  SESSION_SECRET: stringNonempty('SESSION_SECRET cannot be empty'),

  EMAIL_API_KEY: stringNonempty('EMAIL_API_KEY cannot be empty'),
  EMAIL_DOMAIN: stringNonempty('EMAIL_DOMAIN cannot be empty')
})

export const ENV = envSchema.parse(process.env)
