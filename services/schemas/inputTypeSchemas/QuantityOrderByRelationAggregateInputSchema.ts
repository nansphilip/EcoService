import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const QuantityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QuantityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default QuantityOrderByRelationAggregateInputSchema;
