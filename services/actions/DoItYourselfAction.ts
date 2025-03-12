"use server";

/**
 * Actions serveur pour les opérations CRUD sur les doItYourselfs
 * 
 * Ce fichier expose les méthodes de DoItYourselfService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    DoItYourselfService,
    CountDoItYourselfProps,
    CountDoItYourselfResponse,
    CreateDoItYourselfProps,
    CreateDoItYourselfResponse,
    DeleteDoItYourselfProps,
    DeleteDoItYourselfResponse,
    FindManyDoItYourselfProps,
    FindManyDoItYourselfResponse,
    FindUniqueDoItYourselfProps,
    FindUniqueDoItYourselfResponse,
    UpdateDoItYourselfProps,
    UpdateDoItYourselfResponse
} from "@services/class/DoItYourselfClass";

/**
 * Creates a new doItYourself
 * @param props DoItYourself properties
 * @returns Created doItYourself or error
 */
export const CreateDoItYourself = async (props: CreateDoItYourselfProps): Promise<CreateDoItYourselfResponse> => {
    return DoItYourselfService.create(props);
};

/**
 * Updates a doItYourself
 * @param props DoItYourself ID and new data
 * @returns Updated doItYourself or error
 */
export const UpdateDoItYourself = async (props: UpdateDoItYourselfProps): Promise<UpdateDoItYourselfResponse> => {
    return DoItYourselfService.update(props);
};

/**
 * Deletes a doItYourself
 * @param props DoItYourself ID
 * @returns Deleted doItYourself or error
 */
export const DeleteDoItYourself = async (props: DeleteDoItYourselfProps): Promise<DeleteDoItYourselfResponse> => {
    return DoItYourselfService.delete(props);
};

/**
 * Retrieves a doItYourself by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props DoItYourself ID or other filter
 * @returns Found doItYourself or error
 */
export const SelectDoItYourself = async (props: FindUniqueDoItYourselfProps): Promise<FindUniqueDoItYourselfResponse> => {
    return DoItYourselfService.findUnique(props);
};

/**
 * Retrieves a list of doItYourselfs with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of doItYourselfs or error
 */
export const SelectDoItYourselfList = async (props: FindManyDoItYourselfProps): Promise<FindManyDoItYourselfResponse> => {
    return DoItYourselfService.findMany(props);
};

/**
 * Counts doItYourselfs with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of doItYourselfs or error
 */
export const SelectDoItYourselfAmount = async (props: CountDoItYourselfProps): Promise<CountDoItYourselfResponse> => {
    return DoItYourselfService.count(props);
}; 