import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutArticleInputSchema } from './UserCreateWithoutArticleInputSchema';
import { UserUncheckedCreateWithoutArticleInputSchema } from './UserUncheckedCreateWithoutArticleInputSchema';
import { UserCreateOrConnectWithoutArticleInputSchema } from './UserCreateOrConnectWithoutArticleInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutArticleInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticleInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutArticleInputSchema;
