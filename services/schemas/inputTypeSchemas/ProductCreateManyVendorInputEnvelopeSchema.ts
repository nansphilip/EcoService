import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateManyVendorInputSchema } from './ProductCreateManyVendorInputSchema';

export const ProductCreateManyVendorInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyVendorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyVendorInputSchema),z.lazy(() => ProductCreateManyVendorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ProductCreateManyVendorInputEnvelopeSchema;
