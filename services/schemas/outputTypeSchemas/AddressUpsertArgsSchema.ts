import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressIncludeSchema } from '../inputTypeSchemas/AddressIncludeSchema'
import { AddressWhereUniqueInputSchema } from '../inputTypeSchemas/AddressWhereUniqueInputSchema'
import { AddressCreateInputSchema } from '../inputTypeSchemas/AddressCreateInputSchema'
import { AddressUncheckedCreateInputSchema } from '../inputTypeSchemas/AddressUncheckedCreateInputSchema'
import { AddressUpdateInputSchema } from '../inputTypeSchemas/AddressUpdateInputSchema'
import { AddressUncheckedUpdateInputSchema } from '../inputTypeSchemas/AddressUncheckedUpdateInputSchema'
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

export const AddressUpsertArgsSchema: z.ZodType<Prisma.AddressUpsertArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: z.lazy(() => AddressIncludeSchema).optional(),
  where: AddressWhereUniqueInputSchema,
  create: z.union([ AddressCreateInputSchema,AddressUncheckedCreateInputSchema ]),
  update: z.union([ AddressUpdateInputSchema,AddressUncheckedUpdateInputSchema ]),
}).strict() ;

export default AddressUpsertArgsSchema;
