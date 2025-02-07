import { ITaskRespository } from '@/repository/interfaces/ITasksRepository'
import { connectDataBase } from '@/repository/mongo'
import { Task } from '../domain/Task'

export class TasksRepository implements ITaskRespository {
  async save(task: Task) {
    const db = await connectDataBase()
    const collection = db.collection<Task>('tasks')
    await collection.insertOne(task)
  }
}
