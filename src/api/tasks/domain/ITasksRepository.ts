import { Task } from './Task'

export interface ITasksRepository {
  save(task: Task): Promise<void>
}
