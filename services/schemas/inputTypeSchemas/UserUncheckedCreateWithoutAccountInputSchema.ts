import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema } from './ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateNestedManyWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { AddressUncheckedCreateNestedManyWithoutUserInputSchema } from './AddressUncheckedCreateNestedManyWithoutUserInputSchema';
import { OrderUncheckedCreateNestedManyWithoutUserInputSchema } from './OrderUncheckedCreateNestedManyWithoutUserInputSchema';
import { ProductUncheckedCreateNestedManyWithoutVendorInputSchema } from './ProductUncheckedCreateNestedManyWithoutVendorInputSchema';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
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
  Article: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  Adress: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutAccountInputSchema;
