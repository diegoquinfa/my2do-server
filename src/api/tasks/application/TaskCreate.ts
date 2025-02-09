import { ValidationError } from '@/shared/application/errors/ValidationError'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { TaskSchema } from '../domain/Task'
import { TasksRepository } from '../infrastructure/TasksRespository'

export class TaskCreate {
  constructor(private readonly tasksRepository: TasksRepository) { }

  public async run(taskData: unknown): Promise<void> {
    let task = TaskSchema.safeParse(taskData)

    if (!task.success) {
      throw new ValidationError(task.error.flatten())
    }

    try {
      await this.tasksRepository.save(task.data)
    } catch (err) {
      if (err instanceof Error) {
        throw new DatabaseError(err)
      }
    }
  }
}
