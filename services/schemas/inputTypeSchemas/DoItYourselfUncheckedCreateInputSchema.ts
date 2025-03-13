import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentUncheckedCreateNestedManyWithoutDoItYourselfInputSchema } from './ContentUncheckedCreateNestedManyWithoutDoItYourselfInputSchema';

export const DoItYourselfUncheckedCreateInputSchema: z.ZodType<Prisma.DoItYourselfUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutDoItYourselfInputSchema).optional()
}).strict();

export default DoItYourselfUncheckedCreateInputSchema;
