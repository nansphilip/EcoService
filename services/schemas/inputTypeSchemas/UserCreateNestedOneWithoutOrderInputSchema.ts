import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutOrderInputSchema } from './UserCreateWithoutOrderInputSchema';
import { UserUncheckedCreateWithoutOrderInputSchema } from './UserUncheckedCreateWithoutOrderInputSchema';
import { UserCreateOrConnectWithoutOrderInputSchema } from './UserCreateOrConnectWithoutOrderInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutOrderInputSchema;
