import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ArticleNullableScalarRelationFilterSchema } from './ArticleNullableScalarRelationFilterSchema';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';
import { DoItYourselfNullableScalarRelationFilterSchema } from './DoItYourselfNullableScalarRelationFilterSchema';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';

export const ContentWhereInputSchema: z.ZodType<Prisma.ContentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  doItYourselfId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Article: z.union([ z.lazy(() => ArticleNullableScalarRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional().nullable(),
  DoItYourself: z.union([ z.lazy(() => DoItYourselfNullableScalarRelationFilterSchema),z.lazy(() => DoItYourselfWhereInputSchema) ]).optional().nullable(),
}).strict();

export default ContentWhereInputSchema;
