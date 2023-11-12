import { authenticate } from './controllers/authenticate.js'
import { createUsers } from './controllers/create-user.js'
import { profile } from './controllers/profile.js'
import { verifySession } from './middlewares/verify-session.js'
import { categoriesRoutes } from './controllers/categories/routes.js'
import { recipesRoutes } from './controllers/recipes/routes.js'

export async function publicRoutes(app) {
  app.post('/users', createUsers)

  app.post('/sessions', authenticate)
}

export async function privateRoutes(app) {
  // app.addHook('onRequest', verifySession)

  app.register(categoriesRoutes)
  app.register(recipesRoutes)
  app.get('/me', profile)
}
