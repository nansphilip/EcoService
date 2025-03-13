import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutArticleInputSchema } from './UserUpdateWithoutArticleInputSchema';
import { UserUncheckedUpdateWithoutArticleInputSchema } from './UserUncheckedUpdateWithoutArticleInputSchema';
import { UserCreateWithoutArticleInputSchema } from './UserCreateWithoutArticleInputSchema';
import { UserUncheckedCreateWithoutArticleInputSchema } from './UserUncheckedCreateWithoutArticleInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutArticleInputSchema: z.ZodType<Prisma.UserUpsertWithoutArticleInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutArticleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutArticleInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticleInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutArticleInputSchema;
