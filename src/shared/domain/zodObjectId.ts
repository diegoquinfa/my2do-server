import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const zodObjectId = z.custom<ObjectId | string>(
  (value) => ObjectId.isValid(value) || typeof value === 'string'
)
