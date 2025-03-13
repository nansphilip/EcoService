import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';

export const DoItYourselfNullableScalarRelationFilterSchema: z.ZodType<Prisma.DoItYourselfNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => DoItYourselfWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DoItYourselfWhereInputSchema).optional().nullable()
}).strict();

export default DoItYourselfNullableScalarRelationFilterSchema;
