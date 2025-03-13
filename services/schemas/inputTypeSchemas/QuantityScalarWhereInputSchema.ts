import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const QuantityScalarWhereInputSchema: z.ZodType<Prisma.QuantityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuantityScalarWhereInputSchema),z.lazy(() => QuantityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuantityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuantityScalarWhereInputSchema),z.lazy(() => QuantityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default QuantityScalarWhereInputSchema;
