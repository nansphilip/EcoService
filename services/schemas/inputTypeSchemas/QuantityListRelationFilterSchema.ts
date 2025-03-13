import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereInputSchema } from './QuantityWhereInputSchema';

export const QuantityListRelationFilterSchema: z.ZodType<Prisma.QuantityListRelationFilter> = z.object({
  every: z.lazy(() => QuantityWhereInputSchema).optional(),
  some: z.lazy(() => QuantityWhereInputSchema).optional(),
  none: z.lazy(() => QuantityWhereInputSchema).optional()
}).strict();

export default QuantityListRelationFilterSchema;
