import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutOrderInputSchema } from './UserCreateWithoutOrderInputSchema';
import { UserUncheckedCreateWithoutOrderInputSchema } from './UserUncheckedCreateWithoutOrderInputSchema';
import { UserCreateOrConnectWithoutOrderInputSchema } from './UserCreateOrConnectWithoutOrderInputSchema';
import { UserUpsertWithoutOrderInputSchema } from './UserUpsertWithoutOrderInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutOrderInputSchema } from './UserUpdateToOneWithWhereWithoutOrderInputSchema';
import { UserUpdateWithoutOrderInputSchema } from './UserUpdateWithoutOrderInputSchema';
import { UserUncheckedUpdateWithoutOrderInputSchema } from './UserUncheckedUpdateWithoutOrderInputSchema';

export const UserUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutOrderInputSchema),z.lazy(() => UserUpdateWithoutOrderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutOrderNestedInputSchema;
