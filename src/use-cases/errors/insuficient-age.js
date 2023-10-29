export class InsuficientAge extends Error {
  constructor() {
    super('Você não tem idade suficente para ter uma conta.')
  }
}
