import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutQuantityInputSchema } from './ProductCreateWithoutQuantityInputSchema';
import { ProductUncheckedCreateWithoutQuantityInputSchema } from './ProductUncheckedCreateWithoutQuantityInputSchema';
import { ProductCreateOrConnectWithoutQuantityInputSchema } from './ProductCreateOrConnectWithoutQuantityInputSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';

export const ProductCreateNestedOneWithoutQuantityInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutQuantityInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedCreateWithoutQuantityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutQuantityInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export default ProductCreateNestedOneWithoutQuantityInputSchema;
