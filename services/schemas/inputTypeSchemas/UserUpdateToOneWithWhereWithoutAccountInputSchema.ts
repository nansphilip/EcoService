import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutAccountInputSchema } from './UserUpdateWithoutAccountInputSchema';
import { UserUncheckedUpdateWithoutAccountInputSchema } from './UserUncheckedUpdateWithoutAccountInputSchema';

export const UserUpdateToOneWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutAccountInputSchema;
