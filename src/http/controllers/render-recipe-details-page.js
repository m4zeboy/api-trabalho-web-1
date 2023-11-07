import { GetRecipeUseCase } from '../../use-cases/get-recipe.js'

export async function renderRecipeDetailsPage(req, reply) {
  const { id } = req.params
  const useCase = new GetRecipeUseCase()
  const { recipe } = await useCase.execute({ id })

  const categoryBadge = (categoryName) => {
    return `<span class="badge bg-secondary">${categoryName}</span>`
  }

  const categoryList = (categories) => {
    return categories
      .map(({ category_name }) => categoryBadge(category_name))
      .join(' ')
  }

  const ingredientWrapper = ({ ingredient_name, quantity, unity }) => {
    return `      
      <p>
      <span>${quantity}</span>
      <span>${unity}</span>
      <strong>${ingredient_name}</strong>
      </p>`
  }

  const ingredientsList = (ingredients) => {
    return ingredients.map(({ ingredient_name, quantity, unity }) => {
      return ingredientWrapper({ ingredient_name, quantity, unity })
    })
  }

  const article = `        
<article>
  <h1>${recipe.recipe_name}</h1>

  <p class="text-muted">
    <span>${recipe.preparation_time} minuto(s)</span>
    <span> | </span>
    <span>${recipe.portions} porções</span>
  </p>
  <p>
    Receita de <strong>${recipe.author.full_name}</strong>
  </p>

  <p>
    <img src="/public/uploads/${recipe.ImagesOfRecipe[0].url
    }" class="img-fluid rounded"/>
  </p>
  <p>${recipe.description}</p>
  <section>
    <p>
      ${categoryList(recipe.CategoriesOfRecipe)}
    </p>
  </section>
  <section>
    <h2>Ingredientes</h2>
    ${ingredientsList(recipe.IngredientsOfRecipe).join(' ')}
  </section>
</article>
`

  const head = `
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
  `

  const header = `
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
  `

  const html = `
  
  <!DOCTYPE html>
  <html lang="en">
  ${head}

  <body class=" bg-dark" data-bs-theme="dark">
    ${header} 
  
    <div class=" container mt-4">
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

  </body>
  
  </html>
  `
  return reply.type('text/html').send(html)
}
