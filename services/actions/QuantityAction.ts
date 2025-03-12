"use server";

/**
 * Actions serveur pour les opérations CRUD sur les quantitys
 * 
 * Ce fichier expose les méthodes de QuantityService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    QuantityService,
    CountQuantityProps,
    CountQuantityResponse,
    CreateQuantityProps,
    CreateQuantityResponse,
    DeleteQuantityProps,
    DeleteQuantityResponse,
    FindManyQuantityProps,
    FindManyQuantityResponse,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse,
    UpdateQuantityProps,
    UpdateQuantityResponse
} from "@services/class/QuantityClass";

/**
 * Creates a new quantity
 * @param props Quantity properties
 * @returns Created quantity or error
 */
export const CreateQuantity = async (props: CreateQuantityProps): Promise<CreateQuantityResponse> => {
    return QuantityService.create(props);
};

/**
 * Updates a quantity
 * @param props Quantity ID and new data
 * @returns Updated quantity or error
 */
export const UpdateQuantity = async (props: UpdateQuantityProps): Promise<UpdateQuantityResponse> => {
    return QuantityService.update(props);
};

/**
 * Deletes a quantity
 * @param props Quantity ID
 * @returns Deleted quantity or error
 */
export const DeleteQuantity = async (props: DeleteQuantityProps): Promise<DeleteQuantityResponse> => {
    return QuantityService.delete(props);
};

/**
 * Retrieves a quantity by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Quantity ID or other filter
 * @returns Found quantity or error
 */
export const SelectQuantity = async (props: FindUniqueQuantityProps): Promise<FindUniqueQuantityResponse> => {
    return QuantityService.findUnique(props);
};

/**
 * Retrieves a list of quantitys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of quantitys or error
 */
export const SelectQuantityList = async (props: FindManyQuantityProps): Promise<FindManyQuantityResponse> => {
    return QuantityService.findMany(props);
};

/**
 * Counts quantitys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of quantitys or error
 */
export const SelectQuantityAmount = async (props: CountQuantityProps): Promise<CountQuantityResponse> => {
    return QuantityService.count(props);
}; 