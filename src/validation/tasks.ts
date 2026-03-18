import { z } from 'zod';

export const taskCreateSchema = z.object({
  project_id: z.number().int(),
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'qa', 'blocked', 'done']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  due_date: z.string().optional(),
  assignee_id: z.number().int().optional(),
});

export const taskUpdateSchema = taskCreateSchema.partial();
