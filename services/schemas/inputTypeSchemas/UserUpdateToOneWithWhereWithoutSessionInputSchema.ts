import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSessionInputSchema } from './UserUpdateWithoutSessionInputSchema';
import { UserUncheckedUpdateWithoutSessionInputSchema } from './UserUncheckedUpdateWithoutSessionInputSchema';

export const UserUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSessionInputSchema;
