import { InsuficientAge } from '../errors/insuficient-age.js'

export async function verifyUserIsOldEnough(birthDate) {
  const yearOfBirthDate = new Date(birthDate).getFullYear()
  const currentYear = new Date().getFullYear()
  const differenceInYears = Math.abs(currentYear - yearOfBirthDate)
  if (differenceInYears < 13) {
    throw new InsuficientAge()
  }
}
