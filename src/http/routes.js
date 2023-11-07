import { prisma } from '../lib/database.js'
import { attachRecipeImages } from './controllers/attach-recipe-images.js'
import { authenticate } from './controllers/authenticate.js'
import { createRecipe } from './controllers/create-recipe.js'
import { createUsers } from './controllers/create-user.js'
import { profile } from './controllers/profile.js'
import { verifySession } from './middlewares/verify-session.js'
import { getRecipe } from './controllers/get-recipe.js'
import { GetRecipeUseCase } from '../use-cases/get-recipe.js'

export async function publicRoutes(app) {
  app.post('/users', createUsers)

  app.post('/sessions', authenticate)
}

export async function privateRoutes(app) {
  app.addHook('onRequest', verifySession)

  app.get('/public/recipes/create', async (req, reply) => {
    return reply.sendFile('/recipes/create/index.html')
  })

  app.get('/public/recipes/:id', async (req, reply) => {
    const { id } = req.params
    const useCase = new GetRecipeUseCase()
    const { recipe } = await useCase.execute({ id })

    const article = `        
    <article>
    <h1>${recipe.recipe_name}</h1>
    <p>A rich and moist vegan chocolate cake that's perfect for any occasion. Made with simple ingredients and
      without any dairy.</p>
    <section>
      ${recipe.CategoriesOfRecipe.map(({ category_name }) => {
      return `<span class="badge bg-secondary">${category_name}</span>`
    }).join(' ')}
      
    </section>
    <section>
      <h2>Ingredientes</h2>

      ${recipe.IngredientsOfRecipe.map(
      ({ ingredient_name, quantity, unity }) => {
        return `      
        <p>
          <strong>${ingredient_name}</strong>
          <span>${quantity}</span>
          <span>${unity}</span>
        </p>`
      },
    ).join(' ')}


      <p>
        <strong>Sugar</strong>
        <span>1.5</span>
        <span>cups</span>
      </p>

    </section>
  </article>
  
  `

    const html = `
    
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
      <link rel="stylesheet" href="/public/styles/global.css">
    
      <title>Receitas - Home</title>
    </head>
    
    <body class=" bg-dark" data-bs-theme="dark">
      <header class=" container-fluid pt-2 pb-2 bg-body-secondary">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="/public/"><strong>Receitas</strong></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/public/register/">Registrar</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/public/login/">Entrar</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/public/recipes/create">Criar receitas</a>
                </li>
              </ul>
              <form class="d-flex">
                <div class="input-group">
                  <input class="form-control" type="search" aria-label="Search">
                  <button class="btn btn-outline-secondary" type="submit">Pesquisar</button>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    
    
      <div class=" container">
        <div class="row">
          <main class="col-md-9">
        ${article}
          </main>
          <aside class="col-md-3">
            teste
          </aside>
        </div>
      </div>
    
      <footer class="container-fluid bg-body-tertiary mt-4 p-4">
        <small>Moisés Silva de Azevedo e Henrique Cerizza &copy;</small>
      </footer>
      <script src="/public/recipes/script.js"></script>
    </body>
    
    </html>
    `
    return reply.type('text/html').send(html)
  })

  app.post('/recipes', createRecipe)

  app.get('/categories/recipes', async function (req, reply) {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        CategoriesOfRecipe: {
          select: {
            recipe: {
              select: {
                id: true,
                recipe_name: true,
                created: true,
              },
            },
          },
          orderBy: {
            recipe: {
              created: 'asc',
            },
          },
          take: 3,
        },
      },
      take: 3,
    })

    return reply.status(200).send(categories)
  })

  app.get('/me', profile)

  app.post('/recipes/:recipeId/images', attachRecipeImages)

  app.get('/recipes/:recipeId', getRecipe)
}
