import { Routes } from "@app/api/stripe/Routes";
import { ResponseFormat } from "@utils/FetchConfig";

export type Route = keyof Routes;

export type Params<R extends Route> = Routes[R]["params"];

export type FetchProps<R extends Route> = {
    route: R;
    params?: Params<R>;
    method?: Routes[R] extends { method: string } ? Routes[R]["method"] : undefined;
    body?: Routes[R] extends { body: object } ? Routes[R]["body"] : undefined;
    signal?: AbortSignal;
    client?: boolean;
};

export type FetchResponse<R extends Route> = Routes[R]["response"];

export const Fetch = async <R extends Route>(props: FetchProps<R>): Promise<FetchResponse<R>> => {
    const { route, params, method = "GET", body, signal, client = false } = props;

    const baseUrl = client ? "" : process.env.BASE_URL;
    const encodedParams = encodeURIComponent(JSON.stringify(params));
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    const formData = new FormData();
    if (body) {
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    const response = await fetch(url, {
        method,
        ...(body && { body: formData }),
        signal: signal ?? AbortSignal.timeout(10000),
    });

    const { data, error }: ResponseFormat<FetchResponse<R>> = await response.json();

    if (!data || error) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};
