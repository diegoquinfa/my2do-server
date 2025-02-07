import { Task } from '@/api/tasks/domain/Task'

export interface ITaskRespository {
  save(task: Task): Promise<void>
}
