import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutDoItYourselfInputSchema } from './UserCreateWithoutDoItYourselfInputSchema';
import { UserUncheckedCreateWithoutDoItYourselfInputSchema } from './UserUncheckedCreateWithoutDoItYourselfInputSchema';
import { UserCreateOrConnectWithoutDoItYourselfInputSchema } from './UserCreateOrConnectWithoutDoItYourselfInputSchema';
import { UserUpsertWithoutDoItYourselfInputSchema } from './UserUpsertWithoutDoItYourselfInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutDoItYourselfInputSchema } from './UserUpdateToOneWithWhereWithoutDoItYourselfInputSchema';
import { UserUpdateWithoutDoItYourselfInputSchema } from './UserUpdateWithoutDoItYourselfInputSchema';
import { UserUncheckedUpdateWithoutDoItYourselfInputSchema } from './UserUncheckedUpdateWithoutDoItYourselfInputSchema';

export const UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDoItYourselfNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedCreateWithoutDoItYourselfInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDoItYourselfInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDoItYourselfInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDoItYourselfInputSchema),z.lazy(() => UserUpdateWithoutDoItYourselfInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDoItYourselfInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema;
