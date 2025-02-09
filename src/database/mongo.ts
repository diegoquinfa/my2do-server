import { Task } from '@/api/tasks/domain/Task'
import { ENV } from '@/lib/env'
import { Collection, Db, MongoClient } from 'mongodb'

const uri = ENV.DB_URI
const dbName = ENV.DB_NAME

export class Database {
  private static db: Db
  private static client: MongoClient

  constructor() {
    throw new Error('Dont use the constructor')
  }

  public static async connect(): Promise<Db> {
    if (this.db) return this.db

    this.client = new MongoClient(uri)
    await this.client.connect()
    this.db = this.client.db(dbName)

    console.log(`Successfully connected to database: ${dbName}`)

    return this.db
  }

  public static async collection<T extends Task>(
    name: string
  ): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect()
    }

    return this.db.collection<T>(name)
  }
}
