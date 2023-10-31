import { prisma } from '../../lib/database.js'
import { ResourceNotFound } from '../errors/resource-not-found.js'

export async function verifyCategoriesExists(categories) {
  for await (const categoryName of categories) {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    })
    if (!category) {
      throw new ResourceNotFound()
    }
  }
}
