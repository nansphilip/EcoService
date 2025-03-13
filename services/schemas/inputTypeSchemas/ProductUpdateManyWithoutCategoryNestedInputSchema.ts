import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutCategoryInputSchema } from './ProductCreateWithoutCategoryInputSchema';
import { ProductUncheckedCreateWithoutCategoryInputSchema } from './ProductUncheckedCreateWithoutCategoryInputSchema';
import { ProductCreateOrConnectWithoutCategoryInputSchema } from './ProductCreateOrConnectWithoutCategoryInputSchema';
import { ProductUpsertWithWhereUniqueWithoutCategoryInputSchema } from './ProductUpsertWithWhereUniqueWithoutCategoryInputSchema';
import { ProductCreateManyCategoryInputEnvelopeSchema } from './ProductCreateManyCategoryInputEnvelopeSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithWhereUniqueWithoutCategoryInputSchema } from './ProductUpdateWithWhereUniqueWithoutCategoryInputSchema';
import { ProductUpdateManyWithWhereWithoutCategoryInputSchema } from './ProductUpdateManyWithWhereWithoutCategoryInputSchema';
import { ProductScalarWhereInputSchema } from './ProductScalarWhereInputSchema';

export const ProductUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProductUpdateManyWithoutCategoryNestedInputSchema;
