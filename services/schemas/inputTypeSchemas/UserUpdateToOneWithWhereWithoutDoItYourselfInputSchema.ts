import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutDoItYourselfInputSchema } from './UserUpdateWithoutDoItYourselfInputSchema';
import { UserUncheckedUpdateWithoutDoItYourselfInputSchema } from './UserUncheckedUpdateWithoutDoItYourselfInputSchema';

export const UserUpdateToOneWithWhereWithoutDoItYourselfInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDoItYourselfInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutDoItYourselfInputSchema;
