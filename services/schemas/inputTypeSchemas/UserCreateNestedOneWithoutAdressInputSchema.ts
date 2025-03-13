import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAdressInputSchema } from './UserCreateWithoutAdressInputSchema';
import { UserUncheckedCreateWithoutAdressInputSchema } from './UserUncheckedCreateWithoutAdressInputSchema';
import { UserCreateOrConnectWithoutAdressInputSchema } from './UserCreateOrConnectWithoutAdressInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutAdressInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAdressInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdressInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutAdressInputSchema;
