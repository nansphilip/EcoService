import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RoleSchema } from './RoleSchema';
import { EnumRoleFieldUpdateOperationsInputSchema } from './EnumRoleFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ArticleUpdateManyWithoutAuthorNestedInputSchema } from './ArticleUpdateManyWithoutAuthorNestedInputSchema';
import { DoItYourselfUpdateManyWithoutAuthorNestedInputSchema } from './DoItYourselfUpdateManyWithoutAuthorNestedInputSchema';
import { AddressUpdateManyWithoutUserNestedInputSchema } from './AddressUpdateManyWithoutUserNestedInputSchema';
import { OrderUpdateManyWithoutUserNestedInputSchema } from './OrderUpdateManyWithoutUserNestedInputSchema';
import { ProductUpdateManyWithoutVendorNestedInputSchema } from './ProductUpdateManyWithoutVendorNestedInputSchema';
import { SessionUpdateManyWithoutUserNestedInputSchema } from './SessionUpdateManyWithoutUserNestedInputSchema';
import { AccountUpdateManyWithoutUserNestedInputSchema } from './AccountUpdateManyWithoutUserNestedInputSchema';

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeConnectId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOnboarded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSeller: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Article: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfUpdateManyWithoutAuthorNestedInputSchema).optional(),
  Adress: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional(),
  Product: z.lazy(() => ProductUpdateManyWithoutVendorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUpdateInputSchema;
