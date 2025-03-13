import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutProductInputSchema } from './UserCreateWithoutProductInputSchema';
import { UserUncheckedCreateWithoutProductInputSchema } from './UserUncheckedCreateWithoutProductInputSchema';
import { UserCreateOrConnectWithoutProductInputSchema } from './UserCreateOrConnectWithoutProductInputSchema';
import { UserUpsertWithoutProductInputSchema } from './UserUpsertWithoutProductInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutProductInputSchema } from './UserUpdateToOneWithWhereWithoutProductInputSchema';
import { UserUpdateWithoutProductInputSchema } from './UserUpdateWithoutProductInputSchema';
import { UserUncheckedUpdateWithoutProductInputSchema } from './UserUncheckedUpdateWithoutProductInputSchema';

export const UserUpdateOneRequiredWithoutProductNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProductInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProductInputSchema),z.lazy(() => UserUpdateWithoutProductInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutProductNestedInputSchema;
