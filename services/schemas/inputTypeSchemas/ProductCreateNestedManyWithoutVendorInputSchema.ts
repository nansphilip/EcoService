import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateWithoutVendorInputSchema } from './ProductCreateWithoutVendorInputSchema';
import { ProductUncheckedCreateWithoutVendorInputSchema } from './ProductUncheckedCreateWithoutVendorInputSchema';
import { ProductCreateOrConnectWithoutVendorInputSchema } from './ProductCreateOrConnectWithoutVendorInputSchema';
import { ProductCreateManyVendorInputEnvelopeSchema } from './ProductCreateManyVendorInputEnvelopeSchema';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';

export const ProductCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProductCreateNestedManyWithoutVendorInputSchema;
