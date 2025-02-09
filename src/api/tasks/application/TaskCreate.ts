import { Task, TaskSchema } from '../domain/Task'
import { TasksRepository } from '../infrastructure/TasksRespository'

export class TaskCreate {
  constructor(private readonly tasksRepository: TasksRepository) { }

  public async run(taskData: unknown): Promise<void> {
    let task: Task

    try {
      task = TaskSchema.parse(taskData)
    } catch (e) {
      throw new Error('error fatal fatal')
    }

    await this.tasksRepository.save(task)
  }
}
