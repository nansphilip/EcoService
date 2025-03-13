import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const DoItYourselfScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DoItYourselfScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DoItYourselfScalarWhereWithAggregatesInputSchema),z.lazy(() => DoItYourselfScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoItYourselfScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoItYourselfScalarWhereWithAggregatesInputSchema),z.lazy(() => DoItYourselfScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default DoItYourselfScalarWhereWithAggregatesInputSchema;
