import { z } from 'zod';

export const commentCreateSchema = z.object({
  task_id: z.number().int(),
  content: z.string().min(1),
});
