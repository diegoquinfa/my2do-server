import { Database } from '@/database/mongo'
import { ITasksRepository } from '../domain/ITasksRepository'
import { Task } from '../domain/Task'

export class TasksRepository implements ITasksRepository {
  async save(task: Task) {
    const collection = await Database.collection<Task>('tasks')

    await collection.insertOne(task)
  }
}
