import { z } from 'zod'

export function makeCreateUserBodySchema() {
  return z.object({
    fullName: z.string().refine((value) => /^[a-zA-z ]+$/.test(value), {
      message: 'Must contain only letters and spaces',
    }),
    birthDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Invalid date format',
    }),
    city: z.string().refine((value) => /^[a-zA-z ]+$/.test(value), {
      message: 'Must contain only letters and spaces',
    }),
    phoneNumber: z
      .string()
      .refine((value) => /^\(\d{2}\) \d{4}-\d{4}$/.test(value), {
        message: 'Invalid phone number format',
      }),
    email: z.string().email(),
    state: z.string().max(2),
    password: z
      .string()
      .min(8)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/.test(value),
        {
          message: 'Invalid password format',
        },
      ),
    confirmPassword: z
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
