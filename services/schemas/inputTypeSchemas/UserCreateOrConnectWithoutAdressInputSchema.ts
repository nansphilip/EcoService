import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutAdressInputSchema } from './UserCreateWithoutAdressInputSchema';
import { UserUncheckedCreateWithoutAdressInputSchema } from './UserUncheckedCreateWithoutAdressInputSchema';

export const UserCreateOrConnectWithoutAdressInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAdressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAdressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdressInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutAdressInputSchema;
