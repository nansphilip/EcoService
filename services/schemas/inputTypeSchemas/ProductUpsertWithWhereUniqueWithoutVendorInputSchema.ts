import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithoutVendorInputSchema } from './ProductUpdateWithoutVendorInputSchema';
import { ProductUncheckedUpdateWithoutVendorInputSchema } from './ProductUncheckedUpdateWithoutVendorInputSchema';
import { ProductCreateWithoutVendorInputSchema } from './ProductCreateWithoutVendorInputSchema';
import { ProductUncheckedCreateWithoutVendorInputSchema } from './ProductUncheckedCreateWithoutVendorInputSchema';

export const ProductUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export default ProductUpsertWithWhereUniqueWithoutVendorInputSchema;
