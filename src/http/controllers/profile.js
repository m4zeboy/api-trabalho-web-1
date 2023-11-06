import { prisma } from '../../lib/database.js'

export async function profile(request, reply) {
  const userId = request.sub
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return reply.status(404).send({ message: 'Usuário não encontrado' })
  }
  return reply.status(200).send(user)
}
