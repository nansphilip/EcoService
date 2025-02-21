"use server";

import PrismaInstance from "@lib/prisma";
import {
    ProductCommon,
    productCommonSchema,
    ProductId,
    productIdObjectSchema,
    ProductType,
    ProductUpdate,
    productUpdateSchema,
    SelectProductAmountProps,
    selectProductAmountSchema,
    SelectProductListProps,
    selectProductListSchema,
} from "@actions/types/Product";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new product in the database
 * @param props - The product properties to create
 * @returns Promise resolving to the created product or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateProduct = async (
    props: ProductCommon,
): Promise<ProductType | null> => {
    try {
        const data = productCommonSchema.parse(props);

        const productData: ProductType = await PrismaInstance.product.create({
            data,
        });

        return productData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateProduct -> ", error);
            return null;
        }
        throw new Error("CreateProduct -> " + (error as Error).message);
    }
};

/**
 * Retrieves a product by its ID
 * @param props - Object containing the product ID
 * @returns Promise resolving to the found product or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectProduct = async (props: {
    id: ProductId;
}): Promise<ProductType | null> => {
    try {
        const { id } = productIdObjectSchema.parse(props);

        const productData: ProductType | null =
            await PrismaInstance.product.findUnique({
                where: { id },
            });

        return productData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectProduct -> ", error);
            return null;
        }
        throw new Error("SelectProduct -> " + (error as Error).message);
    }
};

/**
 * Retrieves all products from the database
 * @returns Promise resolving to an array of products or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectProductList = async (
    props: SelectProductListProps,
): Promise<ProductType[] | null> => {
    try {
        const {
            orderBy,
            take = 10,
            skip = 0,
            where,
        } = selectProductListSchema.parse(props);

        const productDataList: ProductType[] =
            await PrismaInstance.product.findMany({
                ...(orderBy && { orderBy }),
                ...(take && { take }),
                ...(skip && { skip }),
                ...(where && { where }),
            });

        return productDataList.length ? productDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectProductList -> ", error);
            return null;
        }
        throw new Error("SelectProductList -> " + (error as Error).message);
    }
};

/**
 * Retrieves the total number of products in the database
 * @returns Promise resolving to the total number of products or null if an error occurs
 * @throws Error if an unexpected error occurs
 */
export const SelectProductAmount = async (
    props: SelectProductAmountProps,
): Promise<number | null> => {
    try {
        const { where } = selectProductAmountSchema.parse(props);

        const productDataList = await PrismaInstance.product.count({
            where,
        });

        return productDataList;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectProductAmount -> ", error);
            return null;
        }
        throw new Error("SelectProductAmount -> " + (error as Error).message);
    }
};

/**
 * Updates a product's information in the database
 * @param props - Object containing the product ID and updated data
 * @returns Promise resolving to the updated product or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateProduct = async (
    props: ProductUpdate,
): Promise<ProductType | null> => {
    try {
        const { id, data } = productUpdateSchema.parse(props);

        const productData: ProductType = await PrismaInstance.product.update({
            where: { id },
            data,
        });

        return productData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateProduct -> ", error);
            return null;
        }
        throw new Error("UpdateProduct -> " + (error as Error).message);
    }
};

/**
 * Deletes a product from the database
 * @param props - Object containing the product ID to delete
 * @returns Promise resolving to the deleted product or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteProduct = async (props: {
    id: ProductId;
}): Promise<ProductType | null> => {
    try {
        const { id } = productIdObjectSchema.parse(props);

        const productData: ProductType = await PrismaInstance.product.delete({
            where: { id },
        });

        return productData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteProduct -> ", error);
            return null;
        }
        throw new Error("DeleteProduct -> " + (error as Error).message);
    }
};
