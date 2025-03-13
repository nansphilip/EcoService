import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateWithoutAuthorInputSchema } from './ArticleCreateWithoutAuthorInputSchema';
import { ArticleUncheckedCreateWithoutAuthorInputSchema } from './ArticleUncheckedCreateWithoutAuthorInputSchema';
import { ArticleCreateOrConnectWithoutAuthorInputSchema } from './ArticleCreateOrConnectWithoutAuthorInputSchema';
import { ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema } from './ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema';
import { ArticleCreateManyAuthorInputEnvelopeSchema } from './ArticleCreateManyAuthorInputEnvelopeSchema';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema } from './ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema';
import { ArticleUpdateManyWithWhereWithoutAuthorInputSchema } from './ArticleUpdateManyWithWhereWithoutAuthorInputSchema';
import { ArticleScalarWhereInputSchema } from './ArticleScalarWhereInputSchema';

export const ArticleUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ArticleUpdateManyWithoutAuthorNestedInputSchema;
