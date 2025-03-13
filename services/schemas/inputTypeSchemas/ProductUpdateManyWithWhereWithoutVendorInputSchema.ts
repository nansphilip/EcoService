import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductScalarWhereInputSchema } from './ProductScalarWhereInputSchema';
import { ProductUpdateManyMutationInputSchema } from './ProductUpdateManyMutationInputSchema';
import { ProductUncheckedUpdateManyWithoutVendorInputSchema } from './ProductUncheckedUpdateManyWithoutVendorInputSchema';

export const ProductUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutVendorInputSchema) ]),
}).strict();

export default ProductUpdateManyWithWhereWithoutVendorInputSchema;
