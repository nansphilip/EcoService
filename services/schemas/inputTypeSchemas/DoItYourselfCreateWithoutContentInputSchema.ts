import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutDoItYourselfInputSchema } from './UserCreateNestedOneWithoutDoItYourselfInputSchema';

export const DoItYourselfCreateWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfCreateWithoutContentInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Author: z.lazy(() => UserCreateNestedOneWithoutDoItYourselfInputSchema)
}).strict();

export default DoItYourselfCreateWithoutContentInputSchema;
