"use server";

/**
 * Actions serveur pour les opérations CRUD sur les contents
 * 
 * Ce fichier expose les méthodes de ContentService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    ContentService,
    CountContentProps,
    CountContentResponse,
    CreateContentProps,
    CreateContentResponse,
    DeleteContentProps,
    DeleteContentResponse,
    FindManyContentProps,
    FindManyContentResponse,
    FindUniqueContentProps,
    FindUniqueContentResponse,
    UpdateContentProps,
    UpdateContentResponse
} from "@services/class/ContentClass";

/**
 * Creates a new content
 * @param props Content properties
 * @returns Created content or error
 */
export const CreateContent = async (props: CreateContentProps): Promise<CreateContentResponse> => {
    return ContentService.create(props);
};

/**
 * Updates a content
 * @param props Content ID and new data
 * @returns Updated content or error
 */
export const UpdateContent = async (props: UpdateContentProps): Promise<UpdateContentResponse> => {
    return ContentService.update(props);
};

/**
 * Deletes a content
 * @param props Content ID
 * @returns Deleted content or error
 */
export const DeleteContent = async (props: DeleteContentProps): Promise<DeleteContentResponse> => {
    return ContentService.delete(props);
};

/**
 * Retrieves a content by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Content ID or other filter
 * @returns Found content or error
 */
export const SelectContent = async (props: FindUniqueContentProps): Promise<FindUniqueContentResponse> => {
    return ContentService.findUnique(props);
};

/**
 * Retrieves a list of contents with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of contents or error
 */
export const SelectContentList = async (props: FindManyContentProps): Promise<FindManyContentResponse> => {
    return ContentService.findMany(props);
};

/**
 * Counts contents with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of contents or error
 */
export const SelectContentAmount = async (props: CountContentProps): Promise<CountContentResponse> => {
    return ContentService.count(props);
}; 