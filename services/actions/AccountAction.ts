"use server";

/**
 * Actions serveur pour les opérations CRUD sur les accounts
 * 
 * Ce fichier expose les méthodes de AccountService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    AccountService,
    CountAccountProps,
    CountAccountResponse,
    CreateAccountProps,
    CreateAccountResponse,
    DeleteAccountProps,
    DeleteAccountResponse,
    FindManyAccountProps,
    FindManyAccountResponse,
    FindUniqueAccountProps,
    FindUniqueAccountResponse,
    UpdateAccountProps,
    UpdateAccountResponse
} from "@services/class/AccountClass";

/**
 * Creates a new account
 * @param props Account properties
 * @returns Created account or error
 */
export const CreateAccount = async (props: CreateAccountProps): Promise<CreateAccountResponse> => {
    return AccountService.create(props);
};

/**
 * Updates a account
 * @param props Account ID and new data
 * @returns Updated account or error
 */
export const UpdateAccount = async (props: UpdateAccountProps): Promise<UpdateAccountResponse> => {
    return AccountService.update(props);
};

/**
 * Deletes a account
 * @param props Account ID
 * @returns Deleted account or error
 */
export const DeleteAccount = async (props: DeleteAccountProps): Promise<DeleteAccountResponse> => {
    return AccountService.delete(props);
};

/**
 * Retrieves a account by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Account ID or other filter
 * @returns Found account or error
 */
export const SelectAccount = async (props: FindUniqueAccountProps): Promise<FindUniqueAccountResponse> => {
    return AccountService.findUnique(props);
};

/**
 * Retrieves a list of accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of accounts or error
 */
export const SelectAccountList = async (props: FindManyAccountProps): Promise<FindManyAccountResponse> => {
    return AccountService.findMany(props);
};

/**
 * Counts accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of accounts or error
 */
export const SelectAccountAmount = async (props: CountAccountProps): Promise<CountAccountResponse> => {
    return AccountService.count(props);
}; 