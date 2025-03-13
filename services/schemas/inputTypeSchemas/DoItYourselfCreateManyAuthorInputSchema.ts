import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const DoItYourselfCreateManyAuthorInputSchema: z.ZodType<Prisma.DoItYourselfCreateManyAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default DoItYourselfCreateManyAuthorInputSchema;
