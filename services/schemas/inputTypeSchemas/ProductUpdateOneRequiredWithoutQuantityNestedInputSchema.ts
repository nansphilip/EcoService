import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutQuantityInputSchema } from './ProductCreateWithoutQuantityInputSchema';
import { ProductUncheckedCreateWithoutQuantityInputSchema } from './ProductUncheckedCreateWithoutQuantityInputSchema';
import { ProductCreateOrConnectWithoutQuantityInputSchema } from './ProductCreateOrConnectWithoutQuantityInputSchema';
import { ProductUpsertWithoutQuantityInputSchema } from './ProductUpsertWithoutQuantityInputSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateToOneWithWhereWithoutQuantityInputSchema } from './ProductUpdateToOneWithWhereWithoutQuantityInputSchema';
import { ProductUpdateWithoutQuantityInputSchema } from './ProductUpdateWithoutQuantityInputSchema';
import { ProductUncheckedUpdateWithoutQuantityInputSchema } from './ProductUncheckedUpdateWithoutQuantityInputSchema';

export const ProductUpdateOneRequiredWithoutQuantityNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutQuantityNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedCreateWithoutQuantityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutQuantityInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutQuantityInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutQuantityInputSchema),z.lazy(() => ProductUpdateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutQuantityInputSchema) ]).optional(),
}).strict();

export default ProductUpdateOneRequiredWithoutQuantityNestedInputSchema;
