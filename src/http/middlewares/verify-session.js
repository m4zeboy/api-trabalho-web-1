export async function verifySession(request, reply) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return reply.status(401).send({ error: 'Unauthorized.' })
  }
}
