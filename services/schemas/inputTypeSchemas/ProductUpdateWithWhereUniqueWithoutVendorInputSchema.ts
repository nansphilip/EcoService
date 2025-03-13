import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithoutVendorInputSchema } from './ProductUpdateWithoutVendorInputSchema';
import { ProductUncheckedUpdateWithoutVendorInputSchema } from './ProductUncheckedUpdateWithoutVendorInputSchema';

export const ProductUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export default ProductUpdateWithWhereUniqueWithoutVendorInputSchema;
