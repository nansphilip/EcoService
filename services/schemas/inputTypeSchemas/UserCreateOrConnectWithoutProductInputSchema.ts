import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutProductInputSchema } from './UserCreateWithoutProductInputSchema';
import { UserUncheckedCreateWithoutProductInputSchema } from './UserUncheckedCreateWithoutProductInputSchema';

export const UserCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProductInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutProductInputSchema;
