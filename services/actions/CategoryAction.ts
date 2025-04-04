"use server";

import CategoryService from "@services/class/CategoryClass";
import { CountCategoryProps, CountCategoryResponse, CreateCategoryProps, CreateCategoryResponse, DeleteCategoryProps, DeleteCategoryResponse, FindManyCategoryProps, FindManyCategoryResponse, FindUniqueCategoryProps, FindUniqueCategoryResponse, UpdateCategoryProps, UpdateCategoryResponse, UpsertCategoryProps, UpsertCategoryResponse } from "@services/types/CategoryType";

export const CreateCategory = async <T extends CreateCategoryProps>(props: T): Promise<CreateCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateCategory -> " + (error as Error).message);
    }
};

export const UpsertCategory = async <T extends UpsertCategoryProps>(props: T): Promise<UpsertCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertCategory -> " + (error as Error).message);
    }
};

export const UpdateCategory = async <T extends UpdateCategoryProps>(props: T): Promise<UpdateCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateCategory -> " + (error as Error).message);
    }
};

export const DeleteCategory = async <T extends DeleteCategoryProps>(props: T): Promise<DeleteCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteCategory -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectCategory = async <T extends FindUniqueCategoryProps>(
    props: T
): Promise<FindUniqueCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectCategory -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectCategoryList = async <T extends FindManyCategoryProps>(
    props: T
): Promise<FindManyCategoryResponse<T>> => {
    try {
        const { data, error } = await CategoryService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectCategoryList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectCategoryAmount = async (props: CountCategoryProps): Promise<CountCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectCategoryAmount -> " + (error as Error).message);
    }
};
