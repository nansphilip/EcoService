import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AddressOrderByRelevanceFieldEnumSchema } from './AddressOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const AddressOrderByRelevanceInputSchema: z.ZodType<Prisma.AddressOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AddressOrderByRelevanceFieldEnumSchema),z.lazy(() => AddressOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default AddressOrderByRelevanceInputSchema;
