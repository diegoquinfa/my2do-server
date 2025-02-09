import { ApplicationError } from './ApplicationError'

export class DatabaseError extends ApplicationError {
  constructor(public readonly originalError: Error) {
    super('Database operation failed', 503)
  }
}
