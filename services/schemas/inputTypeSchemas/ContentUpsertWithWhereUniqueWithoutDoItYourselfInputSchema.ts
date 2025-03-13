import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithoutDoItYourselfInputSchema } from './ContentUpdateWithoutDoItYourselfInputSchema';
import { ContentUncheckedUpdateWithoutDoItYourselfInputSchema } from './ContentUncheckedUpdateWithoutDoItYourselfInputSchema';
import { ContentCreateWithoutDoItYourselfInputSchema } from './ContentCreateWithoutDoItYourselfInputSchema';
import { ContentUncheckedCreateWithoutDoItYourselfInputSchema } from './ContentUncheckedCreateWithoutDoItYourselfInputSchema';

export const ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentUpsertWithWhereUniqueWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContentUpdateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutDoItYourselfInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema) ]),
}).strict();

export default ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema;
