"use server";

import {
    ModelNameCommon,
    modelNameCommonSchema,
    ModelNameId,
    modelNameIdObjectSchema,
    ModelNameType,
    ModelNameUpdate,
    modelNameUpdateSchema,
    SelectModelNameAmountProps,
    selectModelNameAmountSchema,
    SelectModelNameListProps,
    selectModelNameListSchema,
    selectModelNameObjectSchema,
    SelectModelNameProps,
} from "@actions/types/_template";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

// ========================== //
// ==== Mutation Methods ==== //
// ========================== //

export type ModelNameMutationResponse = {
    modelNameData?: ModelNameType;
    error?: string;
};

/**
 * Creates a new modelName
 * @param props ModelName properties
 * @returns Created modelName
 * @error Returns error message
 */
export const CreateModelName = async (props: ModelNameCommon): Promise<ModelNameMutationResponse> => {
    try {
        const data = modelNameCommonSchema.parse(props);

        const modelNameData: ModelNameType = await PrismaInstance.modelName.create({
            data,
        });

        return { modelNameData };
    } catch (error) {
        console.error("CreateModelName -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateModelName -> Invalid params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateModelName -> Prisma error -> " + error.message);
            throw new Error("CreateModelName -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a modelName
 * @param props ModelName ID and new data
 * @returns Updated modelName
 * @error Returns error message
 */
export const UpdateModelName = async (props: ModelNameUpdate): Promise<ModelNameMutationResponse> => {
    try {
        const { id, data } = modelNameUpdateSchema.parse(props);

        const modelNameData: ModelNameType = await PrismaInstance.modelName.update({
            where: { id },
            data,
        });

        return { modelNameData };
    } catch (error) {
        console.error("UpdateModelName -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateModelName -> Invalid params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateModelName -> Prisma error -> " + error.message);
            throw new Error("UpdateModelName -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a modelName
 * @param props ModelName ID
 * @returns Deleted modelName
 * @error Returns error message
 */
export const DeleteModelName = async (props: ModelNameId): Promise<ModelNameMutationResponse> => {
    try {
        const { id } = modelNameIdObjectSchema.parse(props);

        const modelNameData: ModelNameType = await PrismaInstance.modelName.delete({
            where: { id },
        });

        return { modelNameData };
    } catch (error) {
        console.error("DeleteModelName -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteModelName -> Invalid params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteModelName -> Prisma error -> " + error.message);
            throw new Error("DeleteModelName -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

// ======================== //
// ==== Select Methods ==== //
// ======================== //

/**
 * Retrieves a modelName by ID or another filter \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props ModelName ID or other filter (name, description...)
 * @returns Found modelName or null
 */
export const SelectModelName = async (props: SelectModelNameProps): Promise<ModelNameType | null> => {
    try {
        const { where } = selectModelNameObjectSchema.parse(props);

        const modelNameData: ModelNameType | null = await PrismaInstance.modelName.findUnique({
            where,
        });

        return modelNameData;
    } catch (error) {
        console.error("SelectModelName -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of modelNames with filters \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of modelNames or null
 */
export const SelectModelNameList = async (props: SelectModelNameListProps): Promise<ModelNameType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectModelNameListSchema.parse(props);

        const modelNameDataList: ModelNameType[] = await PrismaInstance.modelName.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return modelNameDataList.length ? modelNameDataList : null;
    } catch (error) {
        console.error("SelectModelNameList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts modelNames with filters \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of modelNames or null
 */
export const SelectModelNameAmount = async (props: SelectModelNameAmountProps): Promise<number | null> => {
    try {
        const { where } = selectModelNameAmountSchema.parse(props);

        const modelNameAmount: number = await PrismaInstance.modelName.count({
            ...(where && { where }),
        });

        return modelNameAmount;
    } catch (error) {
        console.error("SelectModelNameAmount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
}; 