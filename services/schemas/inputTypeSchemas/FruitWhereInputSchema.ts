import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const FruitWhereInputSchema: z.ZodType<Prisma.FruitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FruitWhereInputSchema),z.lazy(() => FruitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FruitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FruitWhereInputSchema),z.lazy(() => FruitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default FruitWhereInputSchema;
