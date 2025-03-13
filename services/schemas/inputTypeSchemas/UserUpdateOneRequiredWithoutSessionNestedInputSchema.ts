import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSessionInputSchema } from './UserCreateWithoutSessionInputSchema';
import { UserUncheckedCreateWithoutSessionInputSchema } from './UserUncheckedCreateWithoutSessionInputSchema';
import { UserCreateOrConnectWithoutSessionInputSchema } from './UserCreateOrConnectWithoutSessionInputSchema';
import { UserUpsertWithoutSessionInputSchema } from './UserUpsertWithoutSessionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSessionInputSchema } from './UserUpdateToOneWithWhereWithoutSessionInputSchema';
import { UserUpdateWithoutSessionInputSchema } from './UserUpdateWithoutSessionInputSchema';
import { UserUncheckedUpdateWithoutSessionInputSchema } from './UserUncheckedUpdateWithoutSessionInputSchema';

export const UserUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSessionNestedInputSchema;
