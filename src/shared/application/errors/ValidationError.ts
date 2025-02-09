import { ApplicationError } from './ApplicationError'

export class ValidationError extends ApplicationError {
  constructor(public readonly details: unknown) {
    super('Validation failed', 400)
  }
}
