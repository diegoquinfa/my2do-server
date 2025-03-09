import { Database } from '@/database/mongo'
import { ITasksRepository } from '../domain/ITasksRepository'
import { errorHandler } from '@/lib/errorHandler'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { ObjectId } from 'mongodb'
import { Task } from '@/shared/domain/Task'
import { TaskSubmit } from '../domain/TaskSubmit'

export class TasksRepository implements ITasksRepository {
  async save(task: TaskSubmit, userId: string) {
    try {
      const collection = await Database.collection<Task>('tasks')
      await collection.insertOne({ ...task, userId: new ObjectId(userId) })
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }
  }
}
