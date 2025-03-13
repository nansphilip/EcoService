import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateNestedManyWithoutDoItYourselfInputSchema } from './ContentCreateNestedManyWithoutDoItYourselfInputSchema';

export const DoItYourselfCreateWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutDoItYourselfInputSchema).optional()
}).strict();

export default DoItYourselfCreateWithoutAuthorInputSchema;
