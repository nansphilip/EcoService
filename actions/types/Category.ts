import { Category, Prisma } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================== //
// ==== Category Types ==== //
// ======================== //

/** Represents a complete category entity */
export type CategoryType = Category;

/** Represents the category's unique identifier */
export type CategoryId = Pick<Category, "id">;

/** Represents common category properties without system-managed fields */
export type CategoryCommon = Omit<Category, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a category */
export type CategoryUpdate = {
    id: Category["id"];
    data: CategoryCommon;
};

/** Represents system-managed timestamp fields */
export type CategoryTimestamps = Pick<Category, "createdAt" | "updatedAt">;

/** Find one options for categories */
export type SelectCategoryProps = Pick<Prisma.CategoryFindUniqueArgs, "where">;

/** Find many options for categories */
export type SelectCategoryListProps = Pick<Prisma.CategoryFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for categories */
export type SelectCategoryAmountProps = Pick<Prisma.CategoryCountArgs, "where">;
