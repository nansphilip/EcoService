import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { VerificationOrderByRelevanceFieldEnumSchema } from './VerificationOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const VerificationOrderByRelevanceInputSchema: z.ZodType<Prisma.VerificationOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => VerificationOrderByRelevanceFieldEnumSchema),z.lazy(() => VerificationOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default VerificationOrderByRelevanceInputSchema;
