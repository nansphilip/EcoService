import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutArticleInputSchema } from './UserCreateWithoutArticleInputSchema';
import { UserUncheckedCreateWithoutArticleInputSchema } from './UserUncheckedCreateWithoutArticleInputSchema';
import { UserCreateOrConnectWithoutArticleInputSchema } from './UserCreateOrConnectWithoutArticleInputSchema';
import { UserUpsertWithoutArticleInputSchema } from './UserUpsertWithoutArticleInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutArticleInputSchema } from './UserUpdateToOneWithWhereWithoutArticleInputSchema';
import { UserUpdateWithoutArticleInputSchema } from './UserUpdateWithoutArticleInputSchema';
import { UserUncheckedUpdateWithoutArticleInputSchema } from './UserUncheckedUpdateWithoutArticleInputSchema';

export const UserUpdateOneRequiredWithoutArticleNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticleInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticleInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArticleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutArticleInputSchema),z.lazy(() => UserUpdateWithoutArticleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticleInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutArticleNestedInputSchema;
