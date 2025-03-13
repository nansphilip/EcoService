import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAccountInputSchema } from './UserCreateWithoutAccountInputSchema';
import { UserUncheckedCreateWithoutAccountInputSchema } from './UserUncheckedCreateWithoutAccountInputSchema';
import { UserCreateOrConnectWithoutAccountInputSchema } from './UserCreateOrConnectWithoutAccountInputSchema';
import { UserUpsertWithoutAccountInputSchema } from './UserUpsertWithoutAccountInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutAccountInputSchema } from './UserUpdateToOneWithWhereWithoutAccountInputSchema';
import { UserUpdateWithoutAccountInputSchema } from './UserUpdateWithoutAccountInputSchema';
import { UserUncheckedUpdateWithoutAccountInputSchema } from './UserUncheckedUpdateWithoutAccountInputSchema';

export const UserUpdateOneRequiredWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutAccountNestedInputSchema;
