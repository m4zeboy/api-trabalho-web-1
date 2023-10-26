const registerForm = document.querySelector('form#register-form')
const registerInputs = Array.from(
  registerForm.querySelectorAll('input, select'),
)

window.onload = async function () {
  const response = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  )
  const data = await response.json()

  const stateInput = registerInputs.find((input) => input.id === 'state')
  data.forEach((state) => {
    const option = document.createElement('option')
    option.setAttribute('value', state.sigla)
    option.textContent = state.nome
    stateInput.appendChild(option)
  })
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const fieldsValues = registerInputs.map((input) => {
    return {
      field: input.id,
      value: input.value,
    }
  })

  const body = {}

  fieldsValues.forEach(({ field, value }) => {
    body[field] = value
  })

  console.log(body)
  try {
    const response = await fetch('/users', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
  } catch (err) {
    if (err instanceof Error) {
      const invalidFeedback = document.querySelector('.invalid-feedback')
      invalidFeedback.innerHTML = data.message
    }
  }
})
