import { prisma } from '../lib/database.js'
import { InvalidCredentials } from './errors/invalid-credentials.js'
import { ResourceNotFound } from './errors/resource-not-found.js'

export class AuthenticateUserUseCase {
  async execute({ email, password }) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        throw new ResourceNotFound()
      }

      if (user.password !== password) {
        throw new InvalidCredentials()
      }

      return { user }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
