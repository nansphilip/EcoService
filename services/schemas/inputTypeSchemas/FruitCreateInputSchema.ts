import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const FruitCreateInputSchema: z.ZodType<Prisma.FruitCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default FruitCreateInputSchema;
