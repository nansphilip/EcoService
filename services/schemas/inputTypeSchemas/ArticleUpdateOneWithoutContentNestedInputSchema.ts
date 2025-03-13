import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateWithoutContentInputSchema } from './ArticleCreateWithoutContentInputSchema';
import { ArticleUncheckedCreateWithoutContentInputSchema } from './ArticleUncheckedCreateWithoutContentInputSchema';
import { ArticleCreateOrConnectWithoutContentInputSchema } from './ArticleCreateOrConnectWithoutContentInputSchema';
import { ArticleUpsertWithoutContentInputSchema } from './ArticleUpsertWithoutContentInputSchema';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleUpdateToOneWithWhereWithoutContentInputSchema } from './ArticleUpdateToOneWithWhereWithoutContentInputSchema';
import { ArticleUpdateWithoutContentInputSchema } from './ArticleUpdateWithoutContentInputSchema';
import { ArticleUncheckedUpdateWithoutContentInputSchema } from './ArticleUncheckedUpdateWithoutContentInputSchema';

export const ArticleUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.ArticleUpdateOneWithoutContentNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => ArticleUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateToOneWithWhereWithoutContentInputSchema),z.lazy(() => ArticleUpdateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutContentInputSchema) ]).optional(),
}).strict();

export default ArticleUpdateOneWithoutContentNestedInputSchema;
