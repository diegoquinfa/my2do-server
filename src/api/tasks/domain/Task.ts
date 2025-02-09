import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string().min(1, { message: 'The title is required.' }),
  description: z.string().min(1, { message: 'The description is required.' }),
  repeat: z
    .enum(['anytime', 'daily', 'weekly', 'yearly'], {
      errorMap: () => ({
        message:
          'The value of "repeat" must be: anytime, daily, weekly, or yearly.'
      })
    })
    .default('anytime')
})

export type Task = z.infer<typeof TaskSchema>
