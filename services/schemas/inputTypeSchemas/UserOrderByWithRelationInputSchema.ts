import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ArticleOrderByRelationAggregateInputSchema } from './ArticleOrderByRelationAggregateInputSchema';
import { DoItYourselfOrderByRelationAggregateInputSchema } from './DoItYourselfOrderByRelationAggregateInputSchema';
import { AddressOrderByRelationAggregateInputSchema } from './AddressOrderByRelationAggregateInputSchema';
import { OrderOrderByRelationAggregateInputSchema } from './OrderOrderByRelationAggregateInputSchema';
import { ProductOrderByRelationAggregateInputSchema } from './ProductOrderByRelationAggregateInputSchema';
import { SessionOrderByRelationAggregateInputSchema } from './SessionOrderByRelationAggregateInputSchema';
import { AccountOrderByRelationAggregateInputSchema } from './AccountOrderByRelationAggregateInputSchema';
import { UserOrderByRelevanceInputSchema } from './UserOrderByRelevanceInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeConnectId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isOnboarded: z.lazy(() => SortOrderSchema).optional(),
  isSeller: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Article: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfOrderByRelationAggregateInputSchema).optional(),
  Adress: z.lazy(() => AddressOrderByRelationAggregateInputSchema).optional(),
  Order: z.lazy(() => OrderOrderByRelationAggregateInputSchema).optional(),
  Product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  Account: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
