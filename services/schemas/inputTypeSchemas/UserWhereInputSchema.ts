import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumRoleFilterSchema } from './EnumRoleFilterSchema';
import { RoleSchema } from './RoleSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ArticleListRelationFilterSchema } from './ArticleListRelationFilterSchema';
import { DoItYourselfListRelationFilterSchema } from './DoItYourselfListRelationFilterSchema';
import { AddressListRelationFilterSchema } from './AddressListRelationFilterSchema';
import { OrderListRelationFilterSchema } from './OrderListRelationFilterSchema';
import { ProductListRelationFilterSchema } from './ProductListRelationFilterSchema';
import { SessionListRelationFilterSchema } from './SessionListRelationFilterSchema';
import { AccountListRelationFilterSchema } from './AccountListRelationFilterSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeConnectId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isOnboarded: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isSeller: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Article: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfListRelationFilterSchema).optional(),
  Adress: z.lazy(() => AddressListRelationFilterSchema).optional(),
  Order: z.lazy(() => OrderListRelationFilterSchema).optional(),
  Product: z.lazy(() => ProductListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional()
}).strict();

export default UserWhereInputSchema;
