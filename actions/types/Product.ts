import { Prisma, Product } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Product Types ==== //
// ======================= //

/** Represents a complete product entity */
export type ProductType = Product;

/** Represents the product's unique identifier */
export type ProductId = Pick<Product, "id">;

/** Represents common product properties without system-managed fields */
export type ProductCommon = Omit<Product, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a product */
export type ProductUpdate = {
    id: Product["id"];
    data: ProductCommon;
};

/** Represents system-managed timestamp fields */
export type ProductTimestamps = Pick<Product, "createdAt" | "updatedAt">;

/** Find one options for products */
export type SelectProductProps = Pick<Prisma.ProductFindUniqueArgs, "where">;

/** Find many options for products */
export type SelectProductListProps = Pick<Prisma.ProductFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for products */
export type SelectProductAmountProps = Pick<Prisma.ProductCountArgs, "where">;
