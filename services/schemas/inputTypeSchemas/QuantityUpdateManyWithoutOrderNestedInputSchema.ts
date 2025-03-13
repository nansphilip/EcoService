import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateWithoutOrderInputSchema } from './QuantityCreateWithoutOrderInputSchema';
import { QuantityUncheckedCreateWithoutOrderInputSchema } from './QuantityUncheckedCreateWithoutOrderInputSchema';
import { QuantityCreateOrConnectWithoutOrderInputSchema } from './QuantityCreateOrConnectWithoutOrderInputSchema';
import { QuantityUpsertWithWhereUniqueWithoutOrderInputSchema } from './QuantityUpsertWithWhereUniqueWithoutOrderInputSchema';
import { QuantityCreateManyOrderInputEnvelopeSchema } from './QuantityCreateManyOrderInputEnvelopeSchema';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithWhereUniqueWithoutOrderInputSchema } from './QuantityUpdateWithWhereUniqueWithoutOrderInputSchema';
import { QuantityUpdateManyWithWhereWithoutOrderInputSchema } from './QuantityUpdateManyWithWhereWithoutOrderInputSchema';
import { QuantityScalarWhereInputSchema } from './QuantityScalarWhereInputSchema';

export const QuantityUpdateManyWithoutOrderNestedInputSchema: z.ZodType<Prisma.QuantityUpdateManyWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuantityCreateWithoutOrderInputSchema),z.lazy(() => QuantityCreateWithoutOrderInputSchema).array(),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuantityCreateOrConnectWithoutOrderInputSchema),z.lazy(() => QuantityCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuantityUpsertWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => QuantityUpsertWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuantityCreateManyOrderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuantityWhereUniqueInputSchema),z.lazy(() => QuantityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuantityUpdateWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => QuantityUpdateWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuantityUpdateManyWithWhereWithoutOrderInputSchema),z.lazy(() => QuantityUpdateManyWithWhereWithoutOrderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuantityScalarWhereInputSchema),z.lazy(() => QuantityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default QuantityUpdateManyWithoutOrderNestedInputSchema;
