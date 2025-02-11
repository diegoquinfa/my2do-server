import { z } from 'zod'
import { userEmailSchema } from './User'
import { AuthPasswordSchema } from './AuthRegister'

export const authLoginSchema = z.object({
  email: userEmailSchema,
  password: AuthPasswordSchema
})

export type AuthLogin = z.infer<typeof authLoginSchema>
