import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const DoItYourselfScalarWhereInputSchema: z.ZodType<Prisma.DoItYourselfScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DoItYourselfScalarWhereInputSchema),z.lazy(() => DoItYourselfScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoItYourselfScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoItYourselfScalarWhereInputSchema),z.lazy(() => DoItYourselfScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default DoItYourselfScalarWhereInputSchema;
