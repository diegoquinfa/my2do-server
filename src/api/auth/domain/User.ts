import { z } from 'zod'

export const userNameSchema = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters long')
  .max(64, 'Name must be max 64 characters long')

export const userEmailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Email address is not valid')

export const userPasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character')
  .max(32, 'Password must be max 32 characters long')

export const userRegisterSchema = z
  .object({
    name: userNameSchema,
    email: userEmailSchema,
    password: userPasswordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm password is required'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export const userSchema = z.object({
  _id: z.string().optional(),
  name: userNameSchema,
  email: userEmailSchema,
  password: z.string(),
  createdAt: z.date()
})

export type User = z.infer<typeof userSchema>
