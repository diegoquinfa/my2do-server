import { ValidationError } from '@/shared/application/errors/ValidationError'
import { TaskSchema } from '../domain/Task'
import { ITasksRepository } from '../domain/ITasksRepository'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { AuthUserSchema } from '@/shared/domain/AuthUser'

export class TaskCreate {
  private readonly tasksRepository: ITasksRepository

  constructor(tasksRepository: ITasksRepository) {
    this.tasksRepository = tasksRepository
  }

  public async run(taskData: unknown, userAuthData: unknown): Promise<void> {
    const task = TaskSchema.safeParse(taskData)
    const user = AuthUserSchema.safeParse(userAuthData)

    if (!task.success) {
      throw new ValidationError(task.error.flatten())
    }

    if (!user.success) {
      throw new ValidationError(user.error.flatten())
    }

    try {
      await this.tasksRepository.save(task.data, user.data._id)
    } catch (err) {
      if (err instanceof Error) {
        throw new DatabaseError(err)
      }
    }
  }
}
