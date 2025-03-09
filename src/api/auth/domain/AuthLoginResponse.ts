import { UserSchema } from '@/shared/domain/User'
import { z } from 'zod'

export const AuthLoginResponseSchema = UserSchema.extend({
  jwt: z.string()
}).omit({
  password: true,
  createdAt: true
})

export type AuthLoginResponse = z.infer<typeof AuthLoginResponseSchema>
