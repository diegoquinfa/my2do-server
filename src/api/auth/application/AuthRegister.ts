import { hash, genSalt } from 'bcrypt-ts'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { IAuthRepository } from '../domain/IAuthRepository'
import { userSchema } from '../domain/User'
import { authRegisterSchema } from '../domain/AuthRegister'

export class AuthRegister {
  private readonly repository: IAuthRepository

  constructor(repository: IAuthRepository) {
    this.repository = repository
  }

  public async run(registerData: unknown) {
    const authRegister = authRegisterSchema.safeParse(registerData)

    if (authRegister.error) {
      throw new ValidationError(authRegister.error.flatten())
    }

    const register = authRegister.data

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

    await this.repository.register(newUser.data)
  }
}
