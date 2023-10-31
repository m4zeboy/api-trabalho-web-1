const main = document.querySelector('main')

window.onload = async function () {
  const response = await fetch('/categories/recipes')
  if (!response.ok) {
    return
  }

  const data = await response.json()

  for (const category of data) {
    const section = document.createElement('section')
    section.classList.add('container', 'mt-4')
    const h2 = document.createElement('h2')
    h2.innerHTML = category.name
    section.appendChild(h2)

    for (const recipe of category.CategoriesOfRecipe) {
      const card = document.createElement('article')
      card.classList.add('card', 'mb-3')
      const img = document.createElement('img')
      img.classList.add('card-img-top')
      img.src = ''
      card.appendChild(img)

      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      card.appendChild(cardBody)

      const title = document.createElement('h5')
      title.classList.add('card-title')
      title.innerText = recipe.recipe.recipe_name
      cardBody.appendChild(title)

      const link = document.createElement('a')
      link.classList.add('btn', 'btn-primary')
      link.innerText = 'Ver detalhes'
      link.href = `/public/recipes/${recipe.recipe.id}`

      cardBody.appendChild(link)

      section.appendChild(card)
    }

    main.appendChild(section)
  }
}
