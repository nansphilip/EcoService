import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { QuantityOrderByRelationAggregateInputSchema } from './QuantityOrderByRelationAggregateInputSchema';
import { CategoryOrderByWithRelationInputSchema } from './CategoryOrderByWithRelationInputSchema';
import { ProductOrderByRelevanceInputSchema } from './ProductOrderByRelevanceInputSchema';

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Vendor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Quantity: z.lazy(() => QuantityOrderByRelationAggregateInputSchema).optional(),
  Category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ProductOrderByRelevanceInputSchema).optional()
}).strict();

export default ProductOrderByWithRelationInputSchema;
