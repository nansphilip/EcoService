import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ProductScalarRelationFilterSchema } from './ProductScalarRelationFilterSchema';
import { ProductWhereInputSchema } from './ProductWhereInputSchema';
import { OrderScalarRelationFilterSchema } from './OrderScalarRelationFilterSchema';
import { OrderWhereInputSchema } from './OrderWhereInputSchema';

export const QuantityWhereInputSchema: z.ZodType<Prisma.QuantityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuantityWhereInputSchema),z.lazy(() => QuantityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuantityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuantityWhereInputSchema),z.lazy(() => QuantityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  Order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
}).strict();

export default QuantityWhereInputSchema;
