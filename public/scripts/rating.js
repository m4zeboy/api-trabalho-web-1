document.querySelectorAll('#rating .star').forEach((star) => {
  star.onclick = function () {
    const rating = this.dataset.value
    const recipeId = document.getElementById('rating').dataset.recipeId
    updateRating(recipeId, rating)
  }
})

function updateRating(recipeId, rating) {
  fetch('/recipes/' + recipeId + '/rate', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating }),
  })
    .then((response) => response.json())
    .then((data) => {
      setRating(rating) // Atualiza o UI com a nova classificação
      window.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function setRating(rating) {
  document.querySelectorAll('#rating .star').forEach((star) => {
    star.classList.remove('rated')
    if (star.dataset.value <= rating) {
      star.classList.add('rated')
    }
  })
}
