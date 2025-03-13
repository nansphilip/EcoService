import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutDoItYourselfInputSchema } from './UserUpdateWithoutDoItYourselfInputSchema';
import { UserUncheckedUpdateWithoutDoItYourselfInputSchema } from './UserUncheckedUpdateWithoutDoItYourselfInputSchema';
import { UserCreateWithoutDoItYourselfInputSchema } from './UserCreateWithoutDoItYourselfInputSchema';
import { UserUncheckedCreateWithoutDoItYourselfInputSchema } from './UserUncheckedCreateWithoutDoItYourselfInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutDoItYourselfInputSchema: z.ZodType<Prisma.UserUpsertWithoutDoItYourselfInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDoItYourselfInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedCreateWithoutDoItYourselfInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutDoItYourselfInputSchema;
