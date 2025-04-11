"use server";

import DiyService from "@services/class/DiyClass";
import { CountDiyProps, CountDiyResponse, CreateDiyProps, CreateDiyResponse, DeleteDiyProps, DeleteDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse, UpdateDiyProps, UpdateDiyResponse, UpsertDiyProps, UpsertDiyResponse } from "@services/types/DiyType";
import { Exact } from "@utils/FetchConfig";

export const CreateDiy = async <T extends CreateDiyProps>(props: Exact<CreateDiyProps, T>): Promise<CreateDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateDiy -> " + (error as Error).message);
    }
};

export const UpsertDiy = async <T extends UpsertDiyProps>(props: Exact<UpsertDiyProps, T>): Promise<UpsertDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertDiy -> " + (error as Error).message);
    }
};

export const UpdateDiy = async <T extends UpdateDiyProps>(props: Exact<UpdateDiyProps, T>): Promise<UpdateDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateDiy -> " + (error as Error).message);
    }
};

export const DeleteDiy = async <T extends DeleteDiyProps>(props: Exact<DeleteDiyProps, T>): Promise<DeleteDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteDiy -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectDiy = async <T extends FindUniqueDiyProps>(
    props: Exact<FindUniqueDiyProps, T>
): Promise<FindUniqueDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectDiy -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectDiyList = async <T extends FindManyDiyProps>(
    props: Exact<FindManyDiyProps, T>
): Promise<FindManyDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectDiyAmount = async (props: CountDiyProps): Promise<CountDiyResponse> => {
    try {
        const { data, error } = await DiyService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyAmount -> " + (error as Error).message);
    }
};
