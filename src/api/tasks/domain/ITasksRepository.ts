import { Task } from './Task'

export interface ITasksRepository {
  save(task: Task, userAuthData: string): Promise<void>
}
