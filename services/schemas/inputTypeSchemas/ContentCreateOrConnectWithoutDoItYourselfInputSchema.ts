import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentCreateWithoutDoItYourselfInputSchema } from './ContentCreateWithoutDoItYourselfInputSchema';
import { ContentUncheckedCreateWithoutDoItYourselfInputSchema } from './ContentUncheckedCreateWithoutDoItYourselfInputSchema';

export const ContentCreateOrConnectWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema) ]),
}).strict();

export default ContentCreateOrConnectWithoutDoItYourselfInputSchema;
