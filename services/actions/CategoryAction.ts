"use server";

/**
 * Actions serveur pour les opérations CRUD sur les catégories
 * 
 * Ce fichier expose les méthodes de CategoryService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    CategoryService,
    CountCategoryProps,
    CountCategoryResponse,
    CreateCategoryProps,
    CreateCategoryResponse,
    DeleteCategoryProps,
    DeleteCategoryResponse,
    FindManyCategoryProps,
    FindManyCategoryResponse,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse,
    UpdateCategoryProps,
    UpdateCategoryResponse
} from "@services/class/CategoryClass";

/**
 * Creates a new category
 * @param props Category properties
 * @returns Created category or error
 */
export const CreateCategory = async (props: CreateCategoryProps): Promise<CreateCategoryResponse> => {
    return CategoryService.create(props);
};

/**
 * Updates a category
 * @param props Category ID and new data
 * @returns Updated category or error
 */
export const UpdateCategory = async (props: UpdateCategoryProps): Promise<UpdateCategoryResponse> => {
    return CategoryService.update(props);
};

/**
 * Deletes a category
 * @param props Category ID
 * @returns Deleted category or error
 */
export const DeleteCategory = async (props: DeleteCategoryProps): Promise<DeleteCategoryResponse> => {
    return CategoryService.delete(props);
};

/**
 * Retrieves a category by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Category ID or other filter (name, description...)
 * @returns Found category or error
 */
export const SelectCategory = async (props: FindUniqueCategoryProps): Promise<FindUniqueCategoryResponse> => {
    return CategoryService.findUnique(props);
};

/**
 * Retrieves a list of categories with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of categories or error
 */
export const SelectCategoryList = async (props: FindManyCategoryProps): Promise<FindManyCategoryResponse> => {
    return CategoryService.findMany(props);
};

/**
 * Counts categories with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of categories or error
 */
export const SelectCategoryAmount = async (props: CountCategoryProps): Promise<CountCategoryResponse> => {
    return CategoryService.count(props);
};