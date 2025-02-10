import { Task } from '@/api/tasks/domain/Task'
import { User } from '@/api/auth/domain/User'
import { ENV } from '@/lib/env'
import { Collection, Db, MongoClient } from 'mongodb'

export class Database {
  private static db: Db
  private static client: MongoClient

  constructor() {
    throw new Error('Dont use the constructor')
  }

  public static async connect(): Promise<Db> {
    if (this.db) return this.db

    try {
      this.client = new MongoClient(ENV.DB_URI)
      await this.client.connect()
      this.db = this.client.db(ENV.DB_NAME)
      console.log(`Successfully connected to database: ${ENV.DB_NAME}`)
    } catch (err) {
      if (err instanceof Error)
        console.log('Database connection failed: ' + err.name)
      throw err
    }

    return this.db
  }

  public static async collection<T extends Task | User>(
    name: string
  ): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect()
    }

    return this.db.collection<T>(name)
  }
}
