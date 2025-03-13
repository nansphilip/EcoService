import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereInputSchema } from '../inputTypeSchemas/FruitWhereInputSchema'
import { FruitOrderByWithRelationInputSchema } from '../inputTypeSchemas/FruitOrderByWithRelationInputSchema'
import { FruitWhereUniqueInputSchema } from '../inputTypeSchemas/FruitWhereUniqueInputSchema'
import { FruitScalarFieldEnumSchema } from '../inputTypeSchemas/FruitScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FruitSelectSchema: z.ZodType<Prisma.FruitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const FruitFindManyArgsSchema: z.ZodType<Prisma.FruitFindManyArgs> = z.object({
  select: FruitSelectSchema.optional(),
  where: FruitWhereInputSchema.optional(),
  orderBy: z.union([ FruitOrderByWithRelationInputSchema.array(),FruitOrderByWithRelationInputSchema ]).optional(),
  cursor: FruitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FruitScalarFieldEnumSchema,FruitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default FruitFindManyArgsSchema;
