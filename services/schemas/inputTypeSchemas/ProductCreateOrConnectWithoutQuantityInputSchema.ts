import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductCreateWithoutQuantityInputSchema } from './ProductCreateWithoutQuantityInputSchema';
import { ProductUncheckedCreateWithoutQuantityInputSchema } from './ProductUncheckedCreateWithoutQuantityInputSchema';

export const ProductCreateOrConnectWithoutQuantityInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutQuantityInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedCreateWithoutQuantityInputSchema) ]),
}).strict();

export default ProductCreateOrConnectWithoutQuantityInputSchema;
