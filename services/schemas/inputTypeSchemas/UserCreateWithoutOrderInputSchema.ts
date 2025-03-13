import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { ArticleCreateNestedManyWithoutAuthorInputSchema } from './ArticleCreateNestedManyWithoutAuthorInputSchema';
import { DoItYourselfCreateNestedManyWithoutAuthorInputSchema } from './DoItYourselfCreateNestedManyWithoutAuthorInputSchema';
import { AddressCreateNestedManyWithoutUserInputSchema } from './AddressCreateNestedManyWithoutUserInputSchema';
import { ProductCreateNestedManyWithoutVendorInputSchema } from './ProductCreateNestedManyWithoutVendorInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateWithoutOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  stripeId: z.string().optional().nullable(),
  stripeConnectId: z.string().optional().nullable(),
  isOnboarded: z.boolean().optional(),
  isSeller: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Article: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfCreateNestedManyWithoutAuthorInputSchema).optional(),
  Adress: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  Product: z.lazy(() => ProductCreateNestedManyWithoutVendorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutOrderInputSchema;
