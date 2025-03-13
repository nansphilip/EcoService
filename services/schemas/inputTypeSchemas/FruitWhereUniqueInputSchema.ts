import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { FruitWhereInputSchema } from './FruitWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const FruitWhereUniqueInputSchema: z.ZodType<Prisma.FruitWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => FruitWhereInputSchema),z.lazy(() => FruitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FruitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FruitWhereInputSchema),z.lazy(() => FruitWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export default FruitWhereUniqueInputSchema;
