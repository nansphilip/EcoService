import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutCategoryInputSchema } from './ProductCreateWithoutCategoryInputSchema';
import { ProductUncheckedCreateWithoutCategoryInputSchema } from './ProductUncheckedCreateWithoutCategoryInputSchema';
import { ProductCreateOrConnectWithoutCategoryInputSchema } from './ProductCreateOrConnectWithoutCategoryInputSchema';
import { ProductCreateManyCategoryInputEnvelopeSchema } from './ProductCreateManyCategoryInputEnvelopeSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';

export const ProductCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProductCreateNestedManyWithoutCategoryInputSchema;
