import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const QuantitySumOrderByAggregateInputSchema: z.ZodType<Prisma.QuantitySumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default QuantitySumOrderByAggregateInputSchema;
