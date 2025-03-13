import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfIncludeSchema } from '../inputTypeSchemas/DoItYourselfIncludeSchema'
import { DoItYourselfWhereInputSchema } from '../inputTypeSchemas/DoItYourselfWhereInputSchema'
import { DoItYourselfOrderByWithRelationInputSchema } from '../inputTypeSchemas/DoItYourselfOrderByWithRelationInputSchema'
import { DoItYourselfWhereUniqueInputSchema } from '../inputTypeSchemas/DoItYourselfWhereUniqueInputSchema'
import { DoItYourselfScalarFieldEnumSchema } from '../inputTypeSchemas/DoItYourselfScalarFieldEnumSchema'
import { ContentFindManyArgsSchema } from "../outputTypeSchemas/ContentFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { DoItYourselfCountOutputTypeArgsSchema } from "../outputTypeSchemas/DoItYourselfCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DoItYourselfSelectSchema: z.ZodType<Prisma.DoItYourselfSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DoItYourselfCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DoItYourselfFindManyArgsSchema: z.ZodType<Prisma.DoItYourselfFindManyArgs> = z.object({
  select: DoItYourselfSelectSchema.optional(),
  include: z.lazy(() => DoItYourselfIncludeSchema).optional(),
  where: DoItYourselfWhereInputSchema.optional(),
  orderBy: z.union([ DoItYourselfOrderByWithRelationInputSchema.array(),DoItYourselfOrderByWithRelationInputSchema ]).optional(),
  cursor: DoItYourselfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoItYourselfScalarFieldEnumSchema,DoItYourselfScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default DoItYourselfFindManyArgsSchema;
