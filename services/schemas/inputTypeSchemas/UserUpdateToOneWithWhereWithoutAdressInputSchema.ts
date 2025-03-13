import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutAdressInputSchema } from './UserUpdateWithoutAdressInputSchema';
import { UserUncheckedUpdateWithoutAdressInputSchema } from './UserUncheckedUpdateWithoutAdressInputSchema';

export const UserUpdateToOneWithWhereWithoutAdressInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAdressInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAdressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdressInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutAdressInputSchema;
