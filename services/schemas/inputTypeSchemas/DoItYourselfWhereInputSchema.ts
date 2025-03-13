import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ContentListRelationFilterSchema } from './ContentListRelationFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const DoItYourselfWhereInputSchema: z.ZodType<Prisma.DoItYourselfWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DoItYourselfWhereInputSchema),z.lazy(() => DoItYourselfWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoItYourselfWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoItYourselfWhereInputSchema),z.lazy(() => DoItYourselfWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Content: z.lazy(() => ContentListRelationFilterSchema).optional(),
  Author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default DoItYourselfWhereInputSchema;
