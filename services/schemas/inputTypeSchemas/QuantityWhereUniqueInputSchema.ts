import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereInputSchema } from './QuantityWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ProductScalarRelationFilterSchema } from './ProductScalarRelationFilterSchema';
import { ProductWhereInputSchema } from './ProductWhereInputSchema';
import { OrderScalarRelationFilterSchema } from './OrderScalarRelationFilterSchema';
import { OrderWhereInputSchema } from './OrderWhereInputSchema';

export const QuantityWhereUniqueInputSchema: z.ZodType<Prisma.QuantityWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => QuantityWhereInputSchema),z.lazy(() => QuantityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuantityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuantityWhereInputSchema),z.lazy(() => QuantityWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  Order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
}).strict());

export default QuantityWhereUniqueInputSchema;
