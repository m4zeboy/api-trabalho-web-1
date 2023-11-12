import { prisma } from '../../../lib/database.js'

export async function listAllCategories(request, reply) {
  const categories = await prisma.category.findMany()
  return reply.status(200).send(categories)
}
