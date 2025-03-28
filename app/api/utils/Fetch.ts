import { Routes } from "@api/Routes";

/**
 * Props for the Fetch function
 * @template Key - The route key from the Routes type
 */
export type FetchProps<Key extends keyof Routes> = {
    /**
     * The API route to fetch data from
     * @example "/products"
     */
    route: Key;
    /**
     * Optional parameters to send with the request
     */
    params?: Routes[Key]["params"];
    /**
     * Optional method to send with the request
     * @default "GET"
     */
    method?: Routes[Key]["method"];
    /**
     * Optional body to send with the request
     * Usefull to keep File prototype
     */
    body?: Routes[Key]["body"];
    /**
     * Optional AbortSignal for cancelling the request
     */
    signal?: AbortSignal;
    /**
     * Whether the fetch is being called from the client
     * - true: No baseUrl will be prepended (for client-side fetching)
     * - false: baseUrl will be prepended (for server-side fetching)
     * @default false
     */
    client?: boolean;
};

/**
 * Type representing the response structure from an API route
 * @template Key - The route key from the Routes type
 */
export type ResponseType<Key extends keyof Routes> = Routes[Key]["response"];

/**
 * Type helper to extract only the response types that have a data property
 * This helps TypeScript understand that we're accessing the data property safely
 * @template Key - The route key from the Routes type
 */
export type DataResponse<Key extends keyof Routes> = Extract<ResponseType<Key>, { data: unknown }>;

/**
 * A type-safe fetch utility for making API requests
 *
 * This function handles:
 * - Constructing the URL with proper base URL depending on client/server context
 * - Encoding parameters
 * - Setting up AbortController for request cancellation
 * - Type-safe responses based on the Routes type definition
 * - Error handling
 *
 * @template Key - The route key from the Routes type
 * @param props - The fetch configuration
 * @returns A promise that resolves to the data property of the response
 * @throws Error if the request fails or returns an error
 */
export const Fetch = async <Key extends keyof Routes>(props: FetchProps<Key>): Promise<DataResponse<Key>["data"]> => {
    const { route, params, method = "GET", body, signal, client = false } = props;

    // Server requieres a baseUrl, but client doesn't
    const baseUrl = client ? "" : process.env.BASE_URL;

    // Encode the props
    const encodedParams = encodeURIComponent(JSON.stringify(params));

    const urlParams = params ? "?params=" + encodedParams : "";

    // Construct the url
    const url = baseUrl + "/api" + route + urlParams;

    // Create a formData object for POST requests that need it
    const formData = new FormData();

    // Append the object body to the formData object
    if (body) {
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    // Fetch the data
    const response = await fetch(url, {
        method,
        ...(method === "POST" && { body: formData }),
        // Stop the request after 10 seconds
        signal: signal ?? AbortSignal.timeout(10000),
    });

    // Parse and type the data
    const responseData: ResponseType<Key> = await response.json();

    // If the request failed, return an error
    if (!response.ok || "error" in responseData) {
        const errorResponse = responseData as { error?: string };
        throw new Error(errorResponse.error ?? "Something went wrong...");
    }

    // Return the data
    return (responseData as DataResponse<Key>).data;
};
