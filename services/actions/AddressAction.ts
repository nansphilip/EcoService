"use server";

/**
 * Actions serveur pour les opérations CRUD sur les addresss
 * 
 * Ce fichier expose les méthodes de AddressService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    AddressService,
    CountAddressProps,
    CountAddressResponse,
    CreateAddressProps,
    CreateAddressResponse,
    DeleteAddressProps,
    DeleteAddressResponse,
    FindManyAddressProps,
    FindManyAddressResponse,
    FindUniqueAddressProps,
    FindUniqueAddressResponse,
    UpdateAddressProps,
    UpdateAddressResponse
} from "@services/class/AddressClass";

/**
 * Creates a new address
 * @param props Address properties
 * @returns Created address or error
 */
export const CreateAddress = async (props: CreateAddressProps): Promise<CreateAddressResponse> => {
    return AddressService.create(props);
};

/**
 * Updates a address
 * @param props Address ID and new data
 * @returns Updated address or error
 */
export const UpdateAddress = async (props: UpdateAddressProps): Promise<UpdateAddressResponse> => {
    return AddressService.update(props);
};

/**
 * Deletes a address
 * @param props Address ID
 * @returns Deleted address or error
 */
export const DeleteAddress = async (props: DeleteAddressProps): Promise<DeleteAddressResponse> => {
    return AddressService.delete(props);
};

/**
 * Retrieves a address by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Address ID or other filter
 * @returns Found address or error
 */
export const SelectAddress = async (props: FindUniqueAddressProps): Promise<FindUniqueAddressResponse> => {
    return AddressService.findUnique(props);
};

/**
 * Retrieves a list of addresss with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of addresss or error
 */
export const SelectAddressList = async (props: FindManyAddressProps): Promise<FindManyAddressResponse> => {
    return AddressService.findMany(props);
};

/**
 * Counts addresss with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of addresss or error
 */
export const SelectAddressAmount = async (props: CountAddressProps): Promise<CountAddressResponse> => {
    return AddressService.count(props);
}; 