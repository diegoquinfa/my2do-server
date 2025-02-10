import { ValidationError } from '@/shared/application/errors/ValidationError'
import { userRegisterSchema, userSchema } from '../domain/User'
import { AuthRepository } from '../infrastructure/AuthRepository'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'

export class AuthRegister {
  private readonly repository: AuthRepository
  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  public async run(registerData: unknown) {
    const userRegister = userRegisterSchema.safeParse(registerData)

    if (userRegister.error) {
      throw new ValidationError(userRegister.error.flatten())
    }

    if (await this.repository.existsEmail(userRegister.data.email)) {
      throw new ValidationError('Email already exists')
    }

    const newUser = userSchema.safeParse({
      ...userRegister.data,
      createdAt: new Date()
    })

    if (newUser.error) {
      throw new ValidationError(newUser.error.flatten())
    }

    try {
      await this.repository.register(newUser.data)
    } catch (err) {
      if (err instanceof Error) {
        throw new DatabaseError(err)
      }
    }
  }
}
