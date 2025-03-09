import { UserEmailSchema, UserNameSchema } from '@/shared/domain/User'
import { z } from 'zod'

export const AuthPasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character')
  .max(32, 'Password must be max 32 characters long')

export const authRegisterSchema = z
  .object({
    name: UserNameSchema,
    email: UserEmailSchema,
    password: AuthPasswordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm password is required'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type UserRegister = z.infer<typeof authRegisterSchema>
