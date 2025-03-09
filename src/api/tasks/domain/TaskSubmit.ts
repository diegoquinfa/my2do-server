import { TaskSchema } from '@/shared/domain/Task'
import { z } from 'zod'

export const TaskSubmitSchema = TaskSchema.omit({ userId: true })

export type TaskSubmit = z.infer<typeof TaskSubmitSchema>
