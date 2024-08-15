import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'user', 'guest']).optional(),
    profile: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      phoneNumber: z.string().min(1, 'Phone number is required'),
      address: z.string().min(1, 'Address is required'),
    }),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
    role: z.enum(['admin', 'user', 'guest']).optional(),
    profile: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    status: z.enum(['active', 'inactive', 'banned']).optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
