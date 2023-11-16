const addCommentForm = document.querySelector('form#add-comment-form')
const commentField = document.querySelector('textarea#comment')

addCommentForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const recipeId = addCommentForm.dataset.recipeId
  fetch('/recipes/' + recipeId + '/comments', {
    method: 'POST',
    body: JSON.stringify({
      comment: commentField.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((_) => window.location.reload())
})
