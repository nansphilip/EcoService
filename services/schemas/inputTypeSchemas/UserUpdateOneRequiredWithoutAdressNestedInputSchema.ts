import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAdressInputSchema } from './UserCreateWithoutAdressInputSchema';
import { UserUncheckedCreateWithoutAdressInputSchema } from './UserUncheckedCreateWithoutAdressInputSchema';
import { UserCreateOrConnectWithoutAdressInputSchema } from './UserCreateOrConnectWithoutAdressInputSchema';
import { UserUpsertWithoutAdressInputSchema } from './UserUpsertWithoutAdressInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutAdressInputSchema } from './UserUpdateToOneWithWhereWithoutAdressInputSchema';
import { UserUpdateWithoutAdressInputSchema } from './UserUpdateWithoutAdressInputSchema';
import { UserUncheckedUpdateWithoutAdressInputSchema } from './UserUncheckedUpdateWithoutAdressInputSchema';

export const UserUpdateOneRequiredWithoutAdressNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAdressNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdressInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAdressInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAdressInputSchema),z.lazy(() => UserUpdateWithoutAdressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdressInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutAdressNestedInputSchema;
