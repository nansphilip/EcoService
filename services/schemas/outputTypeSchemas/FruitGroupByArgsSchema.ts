import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereInputSchema } from '../inputTypeSchemas/FruitWhereInputSchema'
import { FruitOrderByWithAggregationInputSchema } from '../inputTypeSchemas/FruitOrderByWithAggregationInputSchema'
import { FruitScalarFieldEnumSchema } from '../inputTypeSchemas/FruitScalarFieldEnumSchema'
import { FruitScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/FruitScalarWhereWithAggregatesInputSchema'

export const FruitGroupByArgsSchema: z.ZodType<Prisma.FruitGroupByArgs> = z.object({
  where: FruitWhereInputSchema.optional(),
  orderBy: z.union([ FruitOrderByWithAggregationInputSchema.array(),FruitOrderByWithAggregationInputSchema ]).optional(),
  by: FruitScalarFieldEnumSchema.array(),
  having: FruitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default FruitGroupByArgsSchema;
