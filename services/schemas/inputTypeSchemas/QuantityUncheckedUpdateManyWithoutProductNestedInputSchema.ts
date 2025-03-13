import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateWithoutProductInputSchema } from './QuantityCreateWithoutProductInputSchema';
import { QuantityUncheckedCreateWithoutProductInputSchema } from './QuantityUncheckedCreateWithoutProductInputSchema';
import { QuantityCreateOrConnectWithoutProductInputSchema } from './QuantityCreateOrConnectWithoutProductInputSchema';
import { QuantityUpsertWithWhereUniqueWithoutProductInputSchema } from './QuantityUpsertWithWhereUniqueWithoutProductInputSchema';
import { QuantityCreateManyProductInputEnvelopeSchema } from './QuantityCreateManyProductInputEnvelopeSchema';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithWhereUniqueWithoutProductInputSchema } from './QuantityUpdateWithWhereUniqueWithoutProductInputSchema';
import { QuantityUpdateManyWithWhereWithoutProductInputSchema } from './QuantityUpdateManyWithWhereWithoutProductInputSchema';
import { QuantityScalarWhereInputSchema } from './QuantityScalarWhereInputSchema';

export const QuantityUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.QuantityUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuantityCreateWithoutProductInputSchema),z.lazy(() => QuantityCreateWithoutProductInputSchema).array(),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuantityCreateOrConnectWithoutProductInputSchema),z.lazy(() => QuantityCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuantityUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => QuantityUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuantityCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuantityUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => QuantityUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuantityUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => QuantityUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuantityScalarWhereInputSchema),z.lazy(() => QuantityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default QuantityUncheckedUpdateManyWithoutProductNestedInputSchema;
