import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutArticleInputSchema } from './UserUpdateWithoutArticleInputSchema';
import { UserUncheckedUpdateWithoutArticleInputSchema } from './UserUncheckedUpdateWithoutArticleInputSchema';

export const UserUpdateToOneWithWhereWithoutArticleInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArticleInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutArticleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticleInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutArticleInputSchema;
