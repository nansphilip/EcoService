"use server";

/**
 * Actions serveur pour les opérations CRUD sur les verifications
 * 
 * Ce fichier expose les méthodes de VerificationService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    VerificationService,
    CountVerificationProps,
    CountVerificationResponse,
    CreateVerificationProps,
    CreateVerificationResponse,
    DeleteVerificationProps,
    DeleteVerificationResponse,
    FindManyVerificationProps,
    FindManyVerificationResponse,
    FindUniqueVerificationProps,
    FindUniqueVerificationResponse,
    UpdateVerificationProps,
    UpdateVerificationResponse
} from "@services/class/VerificationClass";

/**
 * Creates a new verification
 * @param props Verification properties
 * @returns Created verification or error
 */
export const CreateVerification = async (props: CreateVerificationProps): Promise<CreateVerificationResponse> => {
    return VerificationService.create(props);
};

/**
 * Updates a verification
 * @param props Verification ID and new data
 * @returns Updated verification or error
 */
export const UpdateVerification = async (props: UpdateVerificationProps): Promise<UpdateVerificationResponse> => {
    return VerificationService.update(props);
};

/**
 * Deletes a verification
 * @param props Verification ID
 * @returns Deleted verification or error
 */
export const DeleteVerification = async (props: DeleteVerificationProps): Promise<DeleteVerificationResponse> => {
    return VerificationService.delete(props);
};

/**
 * Retrieves a verification by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Verification ID or other filter
 * @returns Found verification or error
 */
export const SelectVerification = async (props: FindUniqueVerificationProps): Promise<FindUniqueVerificationResponse> => {
    return VerificationService.findUnique(props);
};

/**
 * Retrieves a list of verifications with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of verifications or error
 */
export const SelectVerificationList = async (props: FindManyVerificationProps): Promise<FindManyVerificationResponse> => {
    return VerificationService.findMany(props);
};

/**
 * Counts verifications with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of verifications or error
 */
export const SelectVerificationAmount = async (props: CountVerificationProps): Promise<CountVerificationResponse> => {
    return VerificationService.count(props);
}; 