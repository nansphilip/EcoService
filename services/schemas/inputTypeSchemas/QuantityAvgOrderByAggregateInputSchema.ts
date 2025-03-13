import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const QuantityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QuantityAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default QuantityAvgOrderByAggregateInputSchema;
