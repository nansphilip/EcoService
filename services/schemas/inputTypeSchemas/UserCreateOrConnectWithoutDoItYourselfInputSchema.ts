import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutDoItYourselfInputSchema } from './UserCreateWithoutDoItYourselfInputSchema';
import { UserUncheckedCreateWithoutDoItYourselfInputSchema } from './UserUncheckedCreateWithoutDoItYourselfInputSchema';

export const UserCreateOrConnectWithoutDoItYourselfInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedCreateWithoutDoItYourselfInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutDoItYourselfInputSchema;
