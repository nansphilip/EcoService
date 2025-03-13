import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSessionInputSchema } from './UserUpdateWithoutSessionInputSchema';
import { UserUncheckedUpdateWithoutSessionInputSchema } from './UserUncheckedUpdateWithoutSessionInputSchema';
import { UserCreateWithoutSessionInputSchema } from './UserCreateWithoutSessionInputSchema';
import { UserUncheckedCreateWithoutSessionInputSchema } from './UserUncheckedCreateWithoutSessionInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSessionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSessionInputSchema;
