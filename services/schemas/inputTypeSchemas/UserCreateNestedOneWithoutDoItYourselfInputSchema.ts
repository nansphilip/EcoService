import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutDoItYourselfInputSchema } from './UserCreateWithoutDoItYourselfInputSchema';
import { UserUncheckedCreateWithoutDoItYourselfInputSchema } from './UserUncheckedCreateWithoutDoItYourselfInputSchema';
import { UserCreateOrConnectWithoutDoItYourselfInputSchema } from './UserCreateOrConnectWithoutDoItYourselfInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutDoItYourselfInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDoItYourselfInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedCreateWithoutDoItYourselfInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDoItYourselfInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutDoItYourselfInputSchema;
