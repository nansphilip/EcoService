import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfScalarWhereInputSchema } from './DoItYourselfScalarWhereInputSchema';
import { DoItYourselfUpdateManyMutationInputSchema } from './DoItYourselfUpdateManyMutationInputSchema';
import { DoItYourselfUncheckedUpdateManyWithoutAuthorInputSchema } from './DoItYourselfUncheckedUpdateManyWithoutAuthorInputSchema';

export const DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => DoItYourselfScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DoItYourselfUpdateManyMutationInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export default DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema;
