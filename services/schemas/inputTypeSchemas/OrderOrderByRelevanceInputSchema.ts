import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderOrderByRelevanceFieldEnumSchema } from './OrderOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const OrderOrderByRelevanceInputSchema: z.ZodType<Prisma.OrderOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => OrderOrderByRelevanceFieldEnumSchema),z.lazy(() => OrderOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default OrderOrderByRelevanceInputSchema;
