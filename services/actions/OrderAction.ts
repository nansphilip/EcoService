"use server";

/**
 * Actions serveur pour les opérations CRUD sur les orders
 * 
 * Ce fichier expose les méthodes de OrderService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    OrderService,
    CountOrderProps,
    CountOrderResponse,
    CreateOrderProps,
    CreateOrderResponse,
    DeleteOrderProps,
    DeleteOrderResponse,
    FindManyOrderProps,
    FindManyOrderResponse,
    FindUniqueOrderProps,
    FindUniqueOrderResponse,
    UpdateOrderProps,
    UpdateOrderResponse
} from "@services/class/OrderClass";

/**
 * Creates a new order
 * @param props Order properties
 * @returns Created order or error
 */
export const CreateOrder = async (props: CreateOrderProps): Promise<CreateOrderResponse> => {
    return OrderService.create(props);
};

/**
 * Updates a order
 * @param props Order ID and new data
 * @returns Updated order or error
 */
export const UpdateOrder = async (props: UpdateOrderProps): Promise<UpdateOrderResponse> => {
    return OrderService.update(props);
};

/**
 * Deletes a order
 * @param props Order ID
 * @returns Deleted order or error
 */
export const DeleteOrder = async (props: DeleteOrderProps): Promise<DeleteOrderResponse> => {
    return OrderService.delete(props);
};

/**
 * Retrieves a order by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Order ID or other filter
 * @returns Found order or error
 */
export const SelectOrder = async (props: FindUniqueOrderProps): Promise<FindUniqueOrderResponse> => {
    return OrderService.findUnique(props);
};

/**
 * Retrieves a list of orders with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of orders or error
 */
export const SelectOrderList = async (props: FindManyOrderProps): Promise<FindManyOrderResponse> => {
    return OrderService.findMany(props);
};

/**
 * Counts orders with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of orders or error
 */
export const SelectOrderAmount = async (props: CountOrderProps): Promise<CountOrderResponse> => {
    return OrderService.count(props);
}; 