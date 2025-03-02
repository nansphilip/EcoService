import { ProductId, SelectProductAmountProps, SelectProductListProps } from "@actions/types/Product";
import { SelectProductResponse } from "@app/api/get/products/[id]/route";
import { SelectProductAmountResponse } from "@app/api/get/products/count/route";
import { SelectProductListResponse } from "@app/api/get/products/route";

/**
 * Type definition for all API routes in the application.
 * This serves as a centralized registry for route parameters and response types.
 * 
 * Each route is defined with:
 * - params: The expected parameters for the route (optional)
 * - response: The expected response type from the route
 * 
 * This type is used by the Fetch utility to provide type safety when making API requests.
 */
export type Routes = {
    /**
     * Route for fetching a list of products
     * GET /api/get/products
     */
    "/products": {
        params?: SelectProductListProps;
        response: SelectProductListResponse;
    };
    /**
     * Route for fetching a single product by ID
     * GET /api/get/products/{id}
     */
    "/products/{id}": {
        params?: ProductId;
        response: SelectProductResponse;
    };
    /**
     * Route for fetching the count of products
     * GET /api/get/products/count
     */
    "/products/count": {
        params?: SelectProductAmountProps;
        response: SelectProductAmountResponse;
    };
};


