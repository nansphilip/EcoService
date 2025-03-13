import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateWithoutDoItYourselfInputSchema } from './ContentCreateWithoutDoItYourselfInputSchema';
import { ContentUncheckedCreateWithoutDoItYourselfInputSchema } from './ContentUncheckedCreateWithoutDoItYourselfInputSchema';
import { ContentCreateOrConnectWithoutDoItYourselfInputSchema } from './ContentCreateOrConnectWithoutDoItYourselfInputSchema';
import { ContentCreateManyDoItYourselfInputEnvelopeSchema } from './ContentCreateManyDoItYourselfInputEnvelopeSchema';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';

export const ContentCreateNestedManyWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentCreateNestedManyWithoutDoItYourselfInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutDoItYourselfInputSchema),z.lazy(() => ContentCreateOrConnectWithoutDoItYourselfInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyDoItYourselfInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ContentCreateNestedManyWithoutDoItYourselfInputSchema;
