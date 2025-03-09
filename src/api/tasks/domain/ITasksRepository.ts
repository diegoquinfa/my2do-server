import { TaskSubmit } from './TaskSubmit'

export interface ITasksRepository {
  save(task: TaskSubmit, userAuthData: string): Promise<void>
}
