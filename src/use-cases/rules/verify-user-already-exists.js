import { prisma } from '../../lib/database.js'
import { UserAlreadyExists } from '../errors/user-already-exists.js'

export async function verifyUserAlreadyExists(email) {
  const userAlreadyExists = await prisma.user.findUnique({
    where: { email },
  })
  if (userAlreadyExists) {
    throw new UserAlreadyExists()
  }
}
