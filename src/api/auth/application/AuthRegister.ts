import { hash, genSalt } from 'bcrypt-ts'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { IAuthRepository } from '../domain/IAuthRepository'
import { authRegisterSchema } from '../domain/AuthRegister'
import { UserSchema } from '@/shared/domain/User'

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

    const registeredUserData = authRegister.data

    if (await this.repository.getUserByEmail(registeredUserData.email)) {
      throw new ValidationError('Email already exists')
    }

    const hashedPassword = await hash(registeredUserData.password, await genSalt(10))

    const newUser = UserSchema.safeParse({
      ...registeredUserData,
      password: hashedPassword,
      createdAt: new Date()
    })

    if (newUser.error) {
      throw new ValidationError(newUser.error.flatten())
    }

    await this.repository.sendEmailVerification(registeredUserData.email)
    await this.repository.register(newUser.data)
  }
}
