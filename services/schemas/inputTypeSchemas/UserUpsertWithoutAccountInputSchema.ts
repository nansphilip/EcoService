import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutAccountInputSchema } from './UserUpdateWithoutAccountInputSchema';
import { UserUncheckedUpdateWithoutAccountInputSchema } from './UserUncheckedUpdateWithoutAccountInputSchema';
import { UserCreateWithoutAccountInputSchema } from './UserCreateWithoutAccountInputSchema';
import { UserUncheckedCreateWithoutAccountInputSchema } from './UserUncheckedCreateWithoutAccountInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutAccountInputSchema;
