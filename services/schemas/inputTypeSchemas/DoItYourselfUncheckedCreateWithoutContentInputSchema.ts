import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const DoItYourselfUncheckedCreateWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfUncheckedCreateWithoutContentInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default DoItYourselfUncheckedCreateWithoutContentInputSchema;
