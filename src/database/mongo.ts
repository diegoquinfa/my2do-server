import { ENV } from '@/lib/env'
import { Db, MongoClient } from 'mongodb'

const uri = ENV.DB_URI
const dbName = ENV.DB_NAME

let client: MongoClient | null = null
let db: Db | null = null

export const connectDataBase = async (): Promise<Db> => {
  if (db) return db

  client = new MongoClient(uri)
  await client.connect()
  db = client.db(dbName)

  console.log(`Successfully connected to database: ${dbName}`)

  return db
}
