import { z } from 'zod';

export const projectCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(['planning', 'in_progress', 'completed', 'on_hold']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  client: z.string().optional(),
  owner_id: z.number().int(),
});

export const projectUpdateSchema = projectCreateSchema.partial();
