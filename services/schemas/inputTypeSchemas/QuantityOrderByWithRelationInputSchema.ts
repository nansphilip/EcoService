import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ProductOrderByWithRelationInputSchema } from './ProductOrderByWithRelationInputSchema';
import { OrderOrderByWithRelationInputSchema } from './OrderOrderByWithRelationInputSchema';
import { QuantityOrderByRelevanceInputSchema } from './QuantityOrderByRelevanceInputSchema';

export const QuantityOrderByWithRelationInputSchema: z.ZodType<Prisma.QuantityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  Order: z.lazy(() => OrderOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => QuantityOrderByRelevanceInputSchema).optional()
}).strict();

export default QuantityOrderByWithRelationInputSchema;
