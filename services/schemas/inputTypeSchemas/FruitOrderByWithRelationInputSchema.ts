import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { FruitOrderByRelevanceInputSchema } from './FruitOrderByRelevanceInputSchema';

export const FruitOrderByWithRelationInputSchema: z.ZodType<Prisma.FruitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => FruitOrderByRelevanceInputSchema).optional()
}).strict();

export default FruitOrderByWithRelationInputSchema;
