import { test, expect, describe, vi } from 'vitest'
import { AuthRepositoryMock } from '../infrastructure/AuthRepositoryMock'
import { AuthRegister } from '@/api/auth/application/AuthRegister'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { UserRegister } from '@/api/auth/domain/User'

describe('AuthRegister', () => {
  test('should throw ValidationError if register data is invalid', async () => {
    const repository = new AuthRepositoryMock()
    const authRegister = new AuthRegister(repository)

    const invalidRegisterData: unknown = {
      email: 'invalid-email',
      password: '123'
    }

    await expect(authRegister.run(invalidRegisterData)).rejects.toThrow(ValidationError)
  })

  test('should throw ValidationError if email already exists', async () => {
    const repositoryMock = new AuthRepositoryMock() // Usamos el mock del repositorio
    const authRegister = new AuthRegister(repositoryMock)

    const validRegisterData = {
      email: 'test@example.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'Test User'
    }

    await repositoryMock.register({
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Existing User',
      createdAt: new Date()
    })

    // Verificar que se lance ValidationError
    await expect(authRegister.run(validRegisterData)).rejects.toThrow(ValidationError)
  })

  test('should throw DatabaseError if repository.register fails', async () => {
    const repositoryMock = new AuthRepositoryMock() // Use the repository mock
    const authRegister = new AuthRegister(repositoryMock)

    // Valid registration data
    const validRegisterData: UserRegister = {
      email: 'test@example.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'Test User'
    }

    // Simulate a database error in the repository
    vi.spyOn(repositoryMock, 'register').mockRejectedValueOnce(
      new DatabaseError(new Error('Database rejected'))
    )

    // Verify that DatabaseError is thrown
    await expect(authRegister.run(validRegisterData)).rejects.toThrow(DatabaseError)
  })
})
