const loginForm = document.querySelector('form#login-form')

const inputs = Array.from(loginForm.querySelectorAll('input'))

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const body = {
    email: inputs[0].value,
    password: inputs[1].value,
  }

  const response = await fetch('/sessions', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const data = await response.json()
    const invalidFeedback = document.querySelector('.alert.alert-danger')
    invalidFeedback.innerHTML = data.message
    invalidFeedback.classList.remove('d-none')
    return
  }
  loginForm.reset()
  window.location.href = '/public/'
})
