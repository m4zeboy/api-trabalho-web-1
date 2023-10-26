import { z } from 'zod'

export function makeAuthenticateBodySchema() {
  return z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/.test(value),
        {
          message: 'Invalid password format',
        },
      ),
  })
}
