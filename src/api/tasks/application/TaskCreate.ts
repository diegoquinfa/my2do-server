import { TaskSchema } from '../domain/Task'
import { TasksRepository } from '../infrastructure/TasksRespository'

export class TaskCreate {
  constructor(private readonly tasksRepository: TasksRepository) { }

  public async run(taskData: unknown): Promise<void> {
    let task = TaskSchema.safeParse(taskData)

    if (!task.success) {
      throw task.error
    }

    try {
      await this.tasksRepository.save(task.data)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error('Database: ' + err)
      }
    }
  }
}
