import { Database } from '@/database/mongo'
import { ITaskRespository } from '../domain/ITasksRepository'
import { Task } from '../domain/Task'

export class TasksRepository implements ITaskRespository {
  async save(task: Task) {
    const collection = await Database.collection<Task>('tasks')

    await collection.insertOne(task)
  }
}
