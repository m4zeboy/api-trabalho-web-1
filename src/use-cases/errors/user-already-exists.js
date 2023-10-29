export class UserAlreadyExists extends Error {
  constructor() {
    super('Usuário já cadastrado com esse email.')
  }
}
