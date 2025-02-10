import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string({ message: "The value 'title' is required." }).min(1),
  description: z
    .string({ message: "The value 'description' description is required." })
    .nonempty()
    .min(1),
  repeat: z
    .enum(['anytime', 'daily', 'weekly', 'yearly'], {
      errorMap: () => ({
        message:
          "The value of 'repeat' must be: anytime, daily, weekly, or yearly."
      })
    })
    .default('anytime')
})

export type Task = z.infer<typeof TaskSchema>
