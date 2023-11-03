import { app } from '../../server.js'

export async function verifySession(request, reply) {
  try {
    const { 'access-token': token } = request.cookies
    const verifiedToken = app.jwt.verify(token)
    request.sub = verifiedToken.sub
  } catch (error) {
    return (
      reply
        .status(401)
        // .redirect('/public/login')
        .send({ message: 'Não autorizado' })
    )
  }
}
