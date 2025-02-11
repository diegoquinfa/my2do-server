import { z } from 'zod'

export const userNameSchema = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters long')
  .max(64, 'Name must be max 64 characters long')

export const userEmailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Email address is not valid')

export const userSchema = z.object({
  _id: z.string().optional(),
  name: userNameSchema,
  email: userEmailSchema,
  password: z.string(),
  createdAt: z.date()
})

export type User = z.infer<typeof userSchema>
