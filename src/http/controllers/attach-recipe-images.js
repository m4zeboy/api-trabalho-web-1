import path from 'node:path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { prisma } from '../../lib/database.js'
import { createWriteStream } from 'node:fs'
import { makeAttachRecipeImageParamsSchema } from './schemas/attach-recipe-image-params-schema.js'

export async function attachRecipeImages(request, reply) {
  const attachRecipeImageParamsSchema = makeAttachRecipeImageParamsSchema()

  const { recipeId } = attachRecipeImageParamsSchema.parse(request.params)
  const pump = promisify(pipeline)

  const parts = request.files()
  for await (const part of parts) {
    const filename = path
      .join(import.meta.url, '..', 'uploads', part.filename)
      .replace('file:', '')

    await pump(part.file, createWriteStream(filename))
    await prisma.imagesOfRecipe.create({
      data: {
        url: part.filename,
        recipeId,
      },
    })
  }
  reply.send()
}
