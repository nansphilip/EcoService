import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressIncludeSchema } from '../inputTypeSchemas/AddressIncludeSchema'
import { AddressWhereInputSchema } from '../inputTypeSchemas/AddressWhereInputSchema'
import { AddressOrderByWithRelationInputSchema } from '../inputTypeSchemas/AddressOrderByWithRelationInputSchema'
import { AddressWhereUniqueInputSchema } from '../inputTypeSchemas/AddressWhereUniqueInputSchema'
import { AddressScalarFieldEnumSchema } from '../inputTypeSchemas/AddressScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AddressSelectSchema: z.ZodType<Prisma.AddressSelect> = z.object({
  id: z.boolean().optional(),
  address: z.boolean().optional(),
  postal: z.boolean().optional(),
  city: z.boolean().optional(),
  country: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AddressFindFirstArgsSchema: z.ZodType<Prisma.AddressFindFirstArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: z.lazy(() => AddressIncludeSchema).optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default AddressFindFirstArgsSchema;
