import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithoutDoItYourselfInputSchema } from './ContentUpdateWithoutDoItYourselfInputSchema';
import { ContentUncheckedUpdateWithoutDoItYourselfInputSchema } from './ContentUncheckedUpdateWithoutDoItYourselfInputSchema';

export const ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentUpdateWithWhereUniqueWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutDoItYourselfInputSchema) ]),
}).strict();

export default ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema;
