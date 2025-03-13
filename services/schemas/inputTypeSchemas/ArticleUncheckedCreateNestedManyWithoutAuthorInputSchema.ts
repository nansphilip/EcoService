import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateWithoutAuthorInputSchema } from './ArticleCreateWithoutAuthorInputSchema';
import { ArticleUncheckedCreateWithoutAuthorInputSchema } from './ArticleUncheckedCreateWithoutAuthorInputSchema';
import { ArticleCreateOrConnectWithoutAuthorInputSchema } from './ArticleCreateOrConnectWithoutAuthorInputSchema';
import { ArticleCreateManyAuthorInputEnvelopeSchema } from './ArticleCreateManyAuthorInputEnvelopeSchema';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';

export const ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema;
