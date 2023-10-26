function extrairParteNumericaBRL(stringBRL) {
  // Remove todos os caracteres não numéricos, exceto vírgulas e pontos.
  const numericPart = stringBRL.replace(/[^\d,.]/g, '')

  // Substitui vírgulas por pontos para obter um formato numérico válido em JavaScript.
  let numericValue = numericPart.replaceAll('.', '')
  numericValue = numericValue.replaceAll(',', '.')

  // Parse a parte numérica como um número de ponto flutuante.
  const parsedNumber = parseFloat(numericValue)

  return parsedNumber
}

// Exemplo de uso:
const stringBRL = 'R$ 1.234.456,56'
const numericValue = extrairParteNumericaBRL(stringBRL)
console.log(
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    numericValue,
  ),
) // Saída: 1234.56 (um número de ponto flutuante)
