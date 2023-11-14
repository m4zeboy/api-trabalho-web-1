export const rating = (recipe) => {
  return `
  <div id="rating" data-recipe-id="${recipe.id}">
    <span class="star" data-value="1">&#9733;</span>
    <span class="star" data-value="2">&#9733;</span>
    <span class="star" data-value="3">&#9733;</span>
    <span class="star" data-value="4">&#9733;</span>
    <span class="star" data-value="5">&#9733;</span>
  </div>
    `
}
