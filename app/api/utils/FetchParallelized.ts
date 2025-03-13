import { Fetch, FetchProps } from "@api/utils/Fetch";
import { Routes } from "@api/Routes";

export const FetchParallelized = async <Key extends keyof Routes>(paramList: FetchProps<Key>[]) => {
    const promiseList = paramList.map((param) => Fetch(param));

    const results = await Promise.all(promiseList);

    return results;
};
