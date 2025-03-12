/**
 * Type definition for all API routes in the application.
 * This serves as a centralized registry for route parameters and response types.
 *
 * Each route is defined with:
 * - params: The expected parameters for the route (optional)
 * - response: The expected response type from the route
 *
 * This type is used by the Fetch utility to provide type safety when making API requests.
 * 
 * ATTENTION: Ce fichier est généré automatiquement. Ne pas modifier manuellement.
 */

import { CountCategoryProps, CreateCategoryProps, FindUniqueCategoryProps, FindUniqueCategoryResponse } from "./class/CategoryClass";
import { CountCategoryResponse, CreateCategoryResponse } from "./class/CategoryClass";

export type Routes = {
    /**
     * Route for fetching a list of categories \
     * GET `/api/categories`
     */
    "/categories": {
        params?: CreateCategoryProps;
        response: CreateCategoryResponse;
    };

    /**
     * Route for fetching a single Category by ID \
     * GET `/api/categories/unique`
     */
    "/categories/unique": {
        params?: FindUniqueCategoryProps;
        response: FindUniqueCategoryResponse;
    };
    /**
     * Route for fetching the count of categories \
     * GET `/api/categories/count`
     */
    "/categories/count": {
        params?: CountCategoryProps;
        response: CountCategoryResponse;
    };
};