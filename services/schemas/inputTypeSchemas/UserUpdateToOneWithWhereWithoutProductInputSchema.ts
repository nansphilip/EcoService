import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutProductInputSchema } from './UserUpdateWithoutProductInputSchema';
import { UserUncheckedUpdateWithoutProductInputSchema } from './UserUncheckedUpdateWithoutProductInputSchema';

export const UserUpdateToOneWithWhereWithoutProductInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProductInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutProductInputSchema;
