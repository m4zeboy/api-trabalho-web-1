import { prisma } from '../lib/database.js'
import { verifyUserAlreadyExists } from './rules/verify-user-already-exists.js'
import { verifyUserIsOldEnough } from './rules/verify-user-is-old-enough.js'
import { InvalidCredentials } from './errors/invalid-credentials.js'

export class CreateUserUseCase {
  async execute({
    birthDate,
    city,
    confirmPassword,
    email,
    fullName,
    password,
    phoneNumber,
  }) {
    try {
      await verifyUserAlreadyExists(email)
      await verifyUserIsOldEnough(birthDate)
      // verify password matches
      if (password !== confirmPassword) {
        throw new InvalidCredentials()
      }
      const user = await prisma.user.create({
        data: {
          full_name: fullName,
          birth_date: new Date(birthDate),
          city,
          email,
          password,
          phone_number: phoneNumber,
        },
      })
      return { user }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
