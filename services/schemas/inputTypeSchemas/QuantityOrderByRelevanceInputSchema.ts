import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityOrderByRelevanceFieldEnumSchema } from './QuantityOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const QuantityOrderByRelevanceInputSchema: z.ZodType<Prisma.QuantityOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => QuantityOrderByRelevanceFieldEnumSchema),z.lazy(() => QuantityOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default QuantityOrderByRelevanceInputSchema;
