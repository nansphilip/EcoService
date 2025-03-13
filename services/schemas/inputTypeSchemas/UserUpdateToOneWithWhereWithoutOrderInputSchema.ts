import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutOrderInputSchema } from './UserUpdateWithoutOrderInputSchema';
import { UserUncheckedUpdateWithoutOrderInputSchema } from './UserUncheckedUpdateWithoutOrderInputSchema';

export const UserUpdateToOneWithWhereWithoutOrderInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOrderInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutOrderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrderInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutOrderInputSchema;
