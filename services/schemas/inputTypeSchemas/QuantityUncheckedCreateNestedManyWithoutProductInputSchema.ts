import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateWithoutProductInputSchema } from './QuantityCreateWithoutProductInputSchema';
import { QuantityUncheckedCreateWithoutProductInputSchema } from './QuantityUncheckedCreateWithoutProductInputSchema';
import { QuantityCreateOrConnectWithoutProductInputSchema } from './QuantityCreateOrConnectWithoutProductInputSchema';
import { QuantityCreateManyProductInputEnvelopeSchema } from './QuantityCreateManyProductInputEnvelopeSchema';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';

export const QuantityUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.QuantityUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => QuantityCreateWithoutProductInputSchema),z.lazy(() => QuantityCreateWithoutProductInputSchema).array(),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuantityCreateOrConnectWithoutProductInputSchema),z.lazy(() => QuantityCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuantityCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default QuantityUncheckedCreateNestedManyWithoutProductInputSchema;
