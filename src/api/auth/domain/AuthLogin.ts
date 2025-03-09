import { z } from 'zod'
import { AuthPasswordSchema } from './AuthRegister'
import { UserEmailSchema } from '@/shared/domain/User'

export const AuthLoginSchema = z.object({
  email: UserEmailSchema,
  password: AuthPasswordSchema
})

export type AuthLogin = z.infer<typeof AuthLoginSchema>
