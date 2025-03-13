import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutOrderInputSchema } from './UserCreateWithoutOrderInputSchema';
import { UserUncheckedCreateWithoutOrderInputSchema } from './UserUncheckedCreateWithoutOrderInputSchema';

export const UserCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutOrderInputSchema;
