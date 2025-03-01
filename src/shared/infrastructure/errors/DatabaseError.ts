import { ResponseError } from '@/shared/ResponseError'

export class DatabaseError extends ResponseError {
  constructor(public readonly originalError: Error) {
    super('Database operation failed', 503)
  }
}
