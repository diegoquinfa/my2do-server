import { hash, genSalt } from 'bcrypt-ts'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { IAuthRepository } from '../domain/IAuthRepository'
import { userRegisterSchema, userSchema } from '../domain/User'

export class AuthRegister {
  private readonly repository: IAuthRepository
  constructor(repository: IAuthRepository) {
    this.repository = repository
  }

  public async run(registerData: unknown) {
    const userRegister = userRegisterSchema.safeParse(registerData)

    if (userRegister.error) {
      throw new ValidationError(userRegister.error.flatten())
    }

    const register = userRegister.data

    if (await this.repository.existsEmail(register.email)) {
      throw new ValidationError('Email already exists')
    }

    const hashedPassword = await hash(register.password, await genSalt(10))

    const newUser = userSchema.safeParse({
      ...register,
      password: hashedPassword,
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
