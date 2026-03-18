import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['admin', 'user']).optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const userCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'user']).default('user'),
  department: z.string().optional(),
  location: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});
