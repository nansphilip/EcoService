import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateNestedManyWithoutDoItYourselfInputSchema } from './ContentCreateNestedManyWithoutDoItYourselfInputSchema';
import { UserCreateNestedOneWithoutDoItYourselfInputSchema } from './UserCreateNestedOneWithoutDoItYourselfInputSchema';

export const DoItYourselfCreateInputSchema: z.ZodType<Prisma.DoItYourselfCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutDoItYourselfInputSchema).optional(),
  Author: z.lazy(() => UserCreateNestedOneWithoutDoItYourselfInputSchema)
}).strict();

export default DoItYourselfCreateInputSchema;
