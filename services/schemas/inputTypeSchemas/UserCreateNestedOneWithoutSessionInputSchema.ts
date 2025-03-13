import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSessionInputSchema } from './UserCreateWithoutSessionInputSchema';
import { UserUncheckedCreateWithoutSessionInputSchema } from './UserUncheckedCreateWithoutSessionInputSchema';
import { UserCreateOrConnectWithoutSessionInputSchema } from './UserCreateOrConnectWithoutSessionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutSessionInputSchema;
