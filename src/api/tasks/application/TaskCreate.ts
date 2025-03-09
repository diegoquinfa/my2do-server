import { ValidationError } from '@/shared/application/errors/ValidationError'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { AuthUserSchema } from '@/shared/domain/AuthUser'
import { ITasksRepository } from '../domain/ITasksRepository'
import { TaskSubmitSchema } from '../domain/TaskSubmit'

export class TaskCreate {
  private readonly tasksRepository: ITasksRepository

  constructor(tasksRepository: ITasksRepository) {
    this.tasksRepository = tasksRepository
  }

  public async run(taskData: unknown, authUserData: unknown): Promise<void> {
    console.log(authUserData)
    const user = AuthUserSchema.safeParse(authUserData)

    if (!user.success) {
      throw new ValidationError(user.error.flatten())
    }

    const task = TaskSubmitSchema.safeParse(taskData)

    if (!task.success) {
      throw new ValidationError(task.error.flatten())
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
