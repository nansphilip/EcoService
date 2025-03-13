import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutAdressInputSchema } from './UserUpdateWithoutAdressInputSchema';
import { UserUncheckedUpdateWithoutAdressInputSchema } from './UserUncheckedUpdateWithoutAdressInputSchema';
import { UserCreateWithoutAdressInputSchema } from './UserCreateWithoutAdressInputSchema';
import { UserUncheckedCreateWithoutAdressInputSchema } from './UserUncheckedCreateWithoutAdressInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutAdressInputSchema: z.ZodType<Prisma.UserUpsertWithoutAdressInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAdressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdressInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAdressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdressInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutAdressInputSchema;
