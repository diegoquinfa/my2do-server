import { z } from 'zod'
import { userSchema } from './User'

export const authLoginResponseSchema = userSchema
  .extend({
    jwt: z.string()
  })
  .omit({
    password: true,
    createdAt: true
  })

export type AuthLoginResponse = z.infer<typeof authLoginResponseSchema>
