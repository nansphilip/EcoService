import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const FruitUncheckedCreateInputSchema: z.ZodType<Prisma.FruitUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default FruitUncheckedCreateInputSchema;
