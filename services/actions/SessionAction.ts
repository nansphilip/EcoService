"use server";

import SessionService from "@services/class/SessionClass";
import { CountSessionProps, CountSessionResponse, CreateSessionProps, CreateSessionResponse, DeleteSessionProps, DeleteSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse, UpdateSessionProps, UpdateSessionResponse, UpsertSessionProps, UpsertSessionResponse } from "@services/types/SessionType";
import { Exact } from "@utils/FetchConfig";

export const CreateSession = async <T extends CreateSessionProps>(props: Exact<CreateSessionProps, T>): Promise<CreateSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateSession -> " + (error as Error).message);
    }
};

export const UpsertSession = async <T extends UpsertSessionProps>(props: Exact<UpsertSessionProps, T>): Promise<UpsertSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertSession -> " + (error as Error).message);
    }
};

export const UpdateSession = async <T extends UpdateSessionProps>(props: Exact<UpdateSessionProps, T>): Promise<UpdateSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateSession -> " + (error as Error).message);
    }
};

export const DeleteSession = async <T extends DeleteSessionProps>(props: Exact<DeleteSessionProps, T>): Promise<DeleteSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteSession -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectSession = async <T extends FindUniqueSessionProps>(
    props: Exact<FindUniqueSessionProps, T>
): Promise<FindUniqueSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectSession -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectSessionList = async <T extends FindManySessionProps>(
    props: Exact<FindManySessionProps, T>
): Promise<FindManySessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectSessionAmount = async (props: CountSessionProps): Promise<CountSessionResponse> => {
    try {
        const { data, error } = await SessionService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionAmount -> " + (error as Error).message);
    }
};
