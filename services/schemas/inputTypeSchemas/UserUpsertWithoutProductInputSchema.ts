import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutProductInputSchema } from './UserUpdateWithoutProductInputSchema';
import { UserUncheckedUpdateWithoutProductInputSchema } from './UserUncheckedUpdateWithoutProductInputSchema';
import { UserCreateWithoutProductInputSchema } from './UserCreateWithoutProductInputSchema';
import { UserUncheckedCreateWithoutProductInputSchema } from './UserUncheckedCreateWithoutProductInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutProductInputSchema: z.ZodType<Prisma.UserUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProductInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProductInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutProductInputSchema;
