"use server";

/**
 * Actions serveur pour les opérations CRUD sur les articles
 * 
 * Ce fichier expose les méthodes de ArticleService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    ArticleService,
    CountArticleProps,
    CountArticleResponse,
    CreateArticleProps,
    CreateArticleResponse,
    DeleteArticleProps,
    DeleteArticleResponse,
    FindManyArticleProps,
    FindManyArticleResponse,
    FindUniqueArticleProps,
    FindUniqueArticleResponse,
    UpdateArticleProps,
    UpdateArticleResponse
} from "@services/class/ArticleClass";

/**
 * Creates a new article
 * @param props Article properties
 * @returns Created article or error
 */
export const CreateArticle = async (props: CreateArticleProps): Promise<CreateArticleResponse> => {
    return ArticleService.create(props);
};

/**
 * Updates a article
 * @param props Article ID and new data
 * @returns Updated article or error
 */
export const UpdateArticle = async (props: UpdateArticleProps): Promise<UpdateArticleResponse> => {
    return ArticleService.update(props);
};

/**
 * Deletes a article
 * @param props Article ID
 * @returns Deleted article or error
 */
export const DeleteArticle = async (props: DeleteArticleProps): Promise<DeleteArticleResponse> => {
    return ArticleService.delete(props);
};

/**
 * Retrieves a article by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Article ID or other filter
 * @returns Found article or error
 */
export const SelectArticle = async (props: FindUniqueArticleProps): Promise<FindUniqueArticleResponse> => {
    return ArticleService.findUnique(props);
};

/**
 * Retrieves a list of articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of articles or error
 */
export const SelectArticleList = async (props: FindManyArticleProps): Promise<FindManyArticleResponse> => {
    return ArticleService.findMany(props);
};

/**
 * Counts articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of articles or error
 */
export const SelectArticleAmount = async (props: CountArticleProps): Promise<CountArticleResponse> => {
    return ArticleService.count(props);
}; 