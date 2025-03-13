import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutVendorInputSchema } from './ProductCreateWithoutVendorInputSchema';
import { ProductUncheckedCreateWithoutVendorInputSchema } from './ProductUncheckedCreateWithoutVendorInputSchema';
import { ProductCreateOrConnectWithoutVendorInputSchema } from './ProductCreateOrConnectWithoutVendorInputSchema';
import { ProductUpsertWithWhereUniqueWithoutVendorInputSchema } from './ProductUpsertWithWhereUniqueWithoutVendorInputSchema';
import { ProductCreateManyVendorInputEnvelopeSchema } from './ProductCreateManyVendorInputEnvelopeSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithWhereUniqueWithoutVendorInputSchema } from './ProductUpdateWithWhereUniqueWithoutVendorInputSchema';
import { ProductUpdateManyWithWhereWithoutVendorInputSchema } from './ProductUpdateManyWithWhereWithoutVendorInputSchema';
import { ProductScalarWhereInputSchema } from './ProductScalarWhereInputSchema';

export const ProductUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProductUpdateManyWithoutVendorNestedInputSchema;
