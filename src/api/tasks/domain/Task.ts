import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  repeat: z
    .union([
      z.literal('anytime'),
      z.literal('daily'),
      z.literal('weekly'),
      z.literal('yearly')
    ])
    .default('anytime')
})

export type Task = z.infer<typeof TaskSchema>
