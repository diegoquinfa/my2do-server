import { Task } from './Task'

export interface ITaskRespository {
  save(task: Task): Promise<void>
}
