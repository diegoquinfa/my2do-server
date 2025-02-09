// import { z } from 'zod'
//
// export const TaskSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   repeat: z
//     .union([
//       z.literal('anytime', {
//         message: 'cualquier momento',
//         description: 'error momento'
//       }),
//       z.literal('daily'),
//       z.literal('weekly'),
//       z.literal('yearly')
//     ])
//     .default('anytime')
// })
//
// export type Task = z.infer<typeof TaskSchema>
import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string().min(1, { message: 'El título es obligatorio.' }),
  description: z.string().min(1, { message: 'La descripción es obligatoria.' }),
  repeat: z
    .enum(['anytime', 'daily', 'weekly', 'yearly'], {
      errorMap: () => ({
        message:
          'El valor de "repeat" debe ser: anytime, daily, weekly o yearly.'
      })
    })
    .default('anytime')
})

export type Task = z.infer<typeof TaskSchema>
