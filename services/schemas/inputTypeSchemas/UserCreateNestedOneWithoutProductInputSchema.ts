import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutProductInputSchema } from './UserCreateWithoutProductInputSchema';
import { UserUncheckedCreateWithoutProductInputSchema } from './UserUncheckedCreateWithoutProductInputSchema';
import { UserCreateOrConnectWithoutProductInputSchema } from './UserCreateOrConnectWithoutProductInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutProductInputSchema;
