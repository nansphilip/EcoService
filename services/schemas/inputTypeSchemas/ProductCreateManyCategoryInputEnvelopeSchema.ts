import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateManyCategoryInputSchema } from './ProductCreateManyCategoryInputSchema';

export const ProductCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyCategoryInputSchema),z.lazy(() => ProductCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ProductCreateManyCategoryInputEnvelopeSchema;
