import { prisma } from '../../lib/database.js'
import { ResourceNotFound } from '../errors/resource-not-found.js'

export async function verifyUserExists(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  if (!user) {
    throw new ResourceNotFound()
  }
}
