"use server";

import AddressService from "@services/class/AddressClass";
import { CountAddressProps, CountAddressResponse, CreateAddressProps, CreateAddressResponse, DeleteAddressProps, DeleteAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse, UpdateAddressProps, UpdateAddressResponse, UpsertAddressProps, UpsertAddressResponse } from "@services/types/AddressType";
import { Exact } from "@utils/FetchConfig";

export const CreateAddress = async <T extends CreateAddressProps>(props: Exact<CreateAddressProps, T>): Promise<CreateAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateAddress -> " + (error as Error).message);
    }
};

export const UpsertAddress = async <T extends UpsertAddressProps>(props: Exact<UpsertAddressProps, T>): Promise<UpsertAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertAddress -> " + (error as Error).message);
    }
};

export const UpdateAddress = async <T extends UpdateAddressProps>(props: Exact<UpdateAddressProps, T>): Promise<UpdateAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateAddress -> " + (error as Error).message);
    }
};

export const DeleteAddress = async <T extends DeleteAddressProps>(props: Exact<DeleteAddressProps, T>): Promise<DeleteAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteAddress -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAddress = async <T extends FindUniqueAddressProps>(
    props: Exact<FindUniqueAddressProps, T>
): Promise<FindUniqueAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectAddress -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAddressList = async <T extends FindManyAddressProps>(
    props: Exact<FindManyAddressProps, T>
): Promise<FindManyAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAddressList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAddressAmount = async (props: CountAddressProps): Promise<CountAddressResponse> => {
    try {
        const { data, error } = await AddressService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAddressAmount -> " + (error as Error).message);
    }
};
