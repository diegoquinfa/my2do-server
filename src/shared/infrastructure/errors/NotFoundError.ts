import { ResponseError } from '@/shared/ResponseError'

export class NotFoundError extends ResponseError {
  constructor(public readonly details: unknown) {
    super('Not Found', 404)
  }
}
