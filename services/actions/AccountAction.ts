"use server";

import AccountService from "@services/class/AccountClass";
import { CountAccountProps, CountAccountResponse, CreateAccountProps, CreateAccountResponse, DeleteAccountProps, DeleteAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse, UpdateAccountProps, UpdateAccountResponse, UpsertAccountProps, UpsertAccountResponse } from "@services/types/AccountType";
import { Exact } from "@utils/FetchConfig";

export const CreateAccount = async <T extends CreateAccountProps>(props: Exact<CreateAccountProps, T>): Promise<CreateAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateAccount -> " + (error as Error).message);
    }
};

export const UpsertAccount = async <T extends UpsertAccountProps>(props: Exact<UpsertAccountProps, T>): Promise<UpsertAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertAccount -> " + (error as Error).message);
    }
};

export const UpdateAccount = async <T extends UpdateAccountProps>(props: Exact<UpdateAccountProps, T>): Promise<UpdateAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateAccount -> " + (error as Error).message);
    }
};

export const DeleteAccount = async <T extends DeleteAccountProps>(props: Exact<DeleteAccountProps, T>): Promise<DeleteAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteAccount -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAccount = async <T extends FindUniqueAccountProps>(
    props: Exact<FindUniqueAccountProps, T>
): Promise<FindUniqueAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectAccount -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAccountList = async <T extends FindManyAccountProps>(
    props: Exact<FindManyAccountProps, T>
): Promise<FindManyAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAccountAmount = async (props: CountAccountProps): Promise<CountAccountResponse> => {
    try {
        const { data, error } = await AccountService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountAmount -> " + (error as Error).message);
    }
};
