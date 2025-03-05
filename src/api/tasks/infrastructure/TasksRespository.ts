import { Database } from '@/database/mongo'
import { ITasksRepository } from '../domain/ITasksRepository'
import { Task } from '../domain/Task'
import { errorHandler } from '@/lib/errorHandler'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'

export class TasksRepository implements ITasksRepository {
  async save(task: Task) {
    try {
      const collection = await Database.collection<Task>('tasks')
      await collection.insertOne(task)
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }
  }
}
