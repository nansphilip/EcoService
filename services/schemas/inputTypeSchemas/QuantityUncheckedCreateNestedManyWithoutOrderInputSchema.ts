import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateWithoutOrderInputSchema } from './QuantityCreateWithoutOrderInputSchema';
import { QuantityUncheckedCreateWithoutOrderInputSchema } from './QuantityUncheckedCreateWithoutOrderInputSchema';
import { QuantityCreateOrConnectWithoutOrderInputSchema } from './QuantityCreateOrConnectWithoutOrderInputSchema';
import { QuantityCreateManyOrderInputEnvelopeSchema } from './QuantityCreateManyOrderInputEnvelopeSchema';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';

export const QuantityUncheckedCreateNestedManyWithoutOrderInputSchema: z.ZodType<Prisma.QuantityUncheckedCreateNestedManyWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => QuantityCreateWithoutOrderInputSchema),z.lazy(() => QuantityCreateWithoutOrderInputSchema).array(),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuantityCreateOrConnectWithoutOrderInputSchema),z.lazy(() => QuantityCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuantityCreateManyOrderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default QuantityUncheckedCreateNestedManyWithoutOrderInputSchema;
