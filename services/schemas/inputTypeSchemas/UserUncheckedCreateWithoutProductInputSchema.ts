import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema } from './ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateNestedManyWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { AddressUncheckedCreateNestedManyWithoutUserInputSchema } from './AddressUncheckedCreateNestedManyWithoutUserInputSchema';
import { OrderUncheckedCreateNestedManyWithoutUserInputSchema } from './OrderUncheckedCreateNestedManyWithoutUserInputSchema';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProductInput> = z.object({
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
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutProductInputSchema;
