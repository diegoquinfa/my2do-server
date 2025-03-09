import { z } from 'zod'
import { UserEmailSchema, UserNameSchema } from './User'

export const AuthUserSchema = z.object({
  _id: z.string(),
  name: UserNameSchema,
  email: UserEmailSchema
})

export type AuthUser = z.infer<typeof AuthUserSchema>
