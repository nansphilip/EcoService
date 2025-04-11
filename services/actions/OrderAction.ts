"use server";

import OrderService from "@services/class/OrderClass";
import { CountOrderProps, CountOrderResponse, CreateOrderProps, CreateOrderResponse, DeleteOrderProps, DeleteOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse, UpdateOrderProps, UpdateOrderResponse, UpsertOrderProps, UpsertOrderResponse } from "@services/types/OrderType";
import { Exact } from "@utils/FetchConfig";

export const CreateOrder = async <T extends CreateOrderProps>(props: Exact<CreateOrderProps, T>): Promise<CreateOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateOrder -> " + (error as Error).message);
    }
};

export const UpsertOrder = async <T extends UpsertOrderProps>(props: Exact<UpsertOrderProps, T>): Promise<UpsertOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertOrder -> " + (error as Error).message);
    }
};

export const UpdateOrder = async <T extends UpdateOrderProps>(props: Exact<UpdateOrderProps, T>): Promise<UpdateOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateOrder -> " + (error as Error).message);
    }
};

export const DeleteOrder = async <T extends DeleteOrderProps>(props: Exact<DeleteOrderProps, T>): Promise<DeleteOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteOrder -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectOrder = async <T extends FindUniqueOrderProps>(
    props: Exact<FindUniqueOrderProps, T>
): Promise<FindUniqueOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectOrder -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectOrderList = async <T extends FindManyOrderProps>(
    props: Exact<FindManyOrderProps, T>
): Promise<FindManyOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectOrderList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectOrderAmount = async (props: CountOrderProps): Promise<CountOrderResponse> => {
    try {
        const { data, error } = await OrderService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectOrderAmount -> " + (error as Error).message);
    }
};
