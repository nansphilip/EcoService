import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentScalarWhereInputSchema } from './ContentScalarWhereInputSchema';
import { ContentUpdateManyMutationInputSchema } from './ContentUpdateManyMutationInputSchema';
import { ContentUncheckedUpdateManyWithoutDoItYourselfInputSchema } from './ContentUncheckedUpdateManyWithoutDoItYourselfInputSchema';

export const ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentUpdateManyWithWhereWithoutDoItYourselfInput> = z.object({
  where: z.lazy(() => ContentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateManyMutationInputSchema),z.lazy(() => ContentUncheckedUpdateManyWithoutDoItYourselfInputSchema) ]),
}).strict();

export default ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema;
