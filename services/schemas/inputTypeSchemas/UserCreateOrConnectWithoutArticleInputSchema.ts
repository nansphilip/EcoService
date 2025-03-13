import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutArticleInputSchema } from './UserCreateWithoutArticleInputSchema';
import { UserUncheckedCreateWithoutArticleInputSchema } from './UserUncheckedCreateWithoutArticleInputSchema';

export const UserCreateOrConnectWithoutArticleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArticleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutArticleInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutArticleInputSchema;
