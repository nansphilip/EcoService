import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ContentScalarWhereInputSchema: z.ZodType<Prisma.ContentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  doItYourselfId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ContentScalarWhereInputSchema;
