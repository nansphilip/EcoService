import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutOrderInputSchema } from './UserUpdateWithoutOrderInputSchema';
import { UserUncheckedUpdateWithoutOrderInputSchema } from './UserUncheckedUpdateWithoutOrderInputSchema';
import { UserCreateWithoutOrderInputSchema } from './UserCreateWithoutOrderInputSchema';
import { UserUncheckedCreateWithoutOrderInputSchema } from './UserUncheckedCreateWithoutOrderInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutOrderInputSchema: z.ZodType<Prisma.UserUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutOrderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutOrderInputSchema;
