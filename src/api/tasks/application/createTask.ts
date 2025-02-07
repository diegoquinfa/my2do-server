import { TaskSchema } from '../domain/Task'
import { TasksRepository } from '../infrastructure/TasksRespository'

export const createTask = (
  taskData: unknown,
  taskRespository: TasksRepository
) => {
  const task = TaskSchema.parse(taskData)

  taskRespository.save(task)
}
