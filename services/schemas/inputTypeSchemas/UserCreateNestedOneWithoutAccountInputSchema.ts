import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAccountInputSchema } from './UserCreateWithoutAccountInputSchema';
import { UserUncheckedCreateWithoutAccountInputSchema } from './UserUncheckedCreateWithoutAccountInputSchema';
import { UserCreateOrConnectWithoutAccountInputSchema } from './UserCreateOrConnectWithoutAccountInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutAccountInputSchema;
