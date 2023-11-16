import { categoryList } from './category-list.js'
import { commentForm } from './comment-form.js'
import { ingredientsList } from './ingredients-list.js'
import { rating } from './rating.js'
export const article = (recipe) => {
  const imageUrl = recipe.ImagesOfRecipe[0].url || ''

  return `        
  <article>
    <h1>${recipe.recipe_name}</h1>
    <section>
      ${rating(recipe)}
      <span>Média de avaliação: <strong>${recipe.avgRating}</strong></span>
    </section>
    <p class="text-muted">
      <span>${recipe.preparation_time} minuto(s)</span>
      <span> | </span>
      <span>${recipe.portions} porções</span>
    </p>
    <p>
      Receita de <strong>${recipe.author.full_name}</strong>
    </p>
  
    <p>
      <img src="/public/uploads/${imageUrl}" class="img-fluid rounded"/>
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
    <hr>
    <section>
      <h3>Comentários</h3>
      ${commentForm(recipe)}
    </section>
  </article>
  `
}
