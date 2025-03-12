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

import { 
  CountUserProps, 
  CountUserResponse,
  FindManyUserProps,
  FindManyUserResponse,
  FindUniqueUserProps,
  FindUniqueUserResponse
} from "@services/class/UserClass";
import { 
  CountSessionProps, 
  CountSessionResponse,
  FindManySessionProps,
  FindManySessionResponse,
  FindUniqueSessionProps,
  FindUniqueSessionResponse
} from "@services/class/SessionClass";
import { 
  CountAccountProps, 
  CountAccountResponse,
  FindManyAccountProps,
  FindManyAccountResponse,
  FindUniqueAccountProps,
  FindUniqueAccountResponse
} from "@services/class/AccountClass";
import { 
  CountVerificationProps, 
  CountVerificationResponse,
  FindManyVerificationProps,
  FindManyVerificationResponse,
  FindUniqueVerificationProps,
  FindUniqueVerificationResponse
} from "@services/class/VerificationClass";
import { 
  CountAddressProps, 
  CountAddressResponse,
  FindManyAddressProps,
  FindManyAddressResponse,
  FindUniqueAddressProps,
  FindUniqueAddressResponse
} from "@services/class/AddressClass";
import { 
  CountArticleProps, 
  CountArticleResponse,
  FindManyArticleProps,
  FindManyArticleResponse,
  FindUniqueArticleProps,
  FindUniqueArticleResponse
} from "@services/class/ArticleClass";
import { 
  CountDoItYourselfProps, 
  CountDoItYourselfResponse,
  FindManyDoItYourselfProps,
  FindManyDoItYourselfResponse,
  FindUniqueDoItYourselfProps,
  FindUniqueDoItYourselfResponse
} from "@services/class/DoItYourselfClass";
import { 
  CountContentProps, 
  CountContentResponse,
  FindManyContentProps,
  FindManyContentResponse,
  FindUniqueContentProps,
  FindUniqueContentResponse
} from "@services/class/ContentClass";
import { 
  CountCategoryProps, 
  CountCategoryResponse,
  FindManyCategoryProps,
  FindManyCategoryResponse,
  FindUniqueCategoryProps,
  FindUniqueCategoryResponse
} from "@services/class/CategoryClass";
import { 
  CountProductProps, 
  CountProductResponse,
  FindManyProductProps,
  FindManyProductResponse,
  FindUniqueProductProps,
  FindUniqueProductResponse
} from "@services/class/ProductClass";
import { 
  CountQuantityProps, 
  CountQuantityResponse,
  FindManyQuantityProps,
  FindManyQuantityResponse,
  FindUniqueQuantityProps,
  FindUniqueQuantityResponse
} from "@services/class/QuantityClass";
import { 
  CountOrderProps, 
  CountOrderResponse,
  FindManyOrderProps,
  FindManyOrderResponse,
  FindUniqueOrderProps,
  FindUniqueOrderResponse
} from "@services/class/OrderClass";
import { 
  CountFruitProps, 
  CountFruitResponse,
  FindManyFruitProps,
  FindManyFruitResponse,
  FindUniqueFruitProps,
  FindUniqueFruitResponse
} from "@services/class/FruitClass";

export type Routes = {
  /**
   * Route for fetching a list of users \
   * GET `/api/users`
   */
  "/users": {
    params?: FindManyUserProps;
    response: FindManyUserResponse;
  };

  /**
   * Route for fetching a single User by ID \
   * GET `/api/users/unique`
   */
  "/users/unique": {
    params?: FindUniqueUserProps;
    response: FindUniqueUserResponse;
  };
  
  /**
   * Route for fetching the count of users \
   * GET `/api/users/count`
   */
  "/users/count": {
    params?: CountUserProps;
    response: CountUserResponse;
  };

  /**
   * Route for fetching a list of sessions \
   * GET `/api/sessions`
   */
  "/sessions": {
    params?: FindManySessionProps;
    response: FindManySessionResponse;
  };

  /**
   * Route for fetching a single Session by ID \
   * GET `/api/sessions/unique`
   */
  "/sessions/unique": {
    params?: FindUniqueSessionProps;
    response: FindUniqueSessionResponse;
  };
  
  /**
   * Route for fetching the count of sessions \
   * GET `/api/sessions/count`
   */
  "/sessions/count": {
    params?: CountSessionProps;
    response: CountSessionResponse;
  };

  /**
   * Route for fetching a list of accounts \
   * GET `/api/accounts`
   */
  "/accounts": {
    params?: FindManyAccountProps;
    response: FindManyAccountResponse;
  };

  /**
   * Route for fetching a single Account by ID \
   * GET `/api/accounts/unique`
   */
  "/accounts/unique": {
    params?: FindUniqueAccountProps;
    response: FindUniqueAccountResponse;
  };
  
  /**
   * Route for fetching the count of accounts \
   * GET `/api/accounts/count`
   */
  "/accounts/count": {
    params?: CountAccountProps;
    response: CountAccountResponse;
  };

  /**
   * Route for fetching a list of verifications \
   * GET `/api/verifications`
   */
  "/verifications": {
    params?: FindManyVerificationProps;
    response: FindManyVerificationResponse;
  };

  /**
   * Route for fetching a single Verification by ID \
   * GET `/api/verifications/unique`
   */
  "/verifications/unique": {
    params?: FindUniqueVerificationProps;
    response: FindUniqueVerificationResponse;
  };
  
  /**
   * Route for fetching the count of verifications \
   * GET `/api/verifications/count`
   */
  "/verifications/count": {
    params?: CountVerificationProps;
    response: CountVerificationResponse;
  };

  /**
   * Route for fetching a list of addresses \
   * GET `/api/addresses`
   */
  "/addresses": {
    params?: FindManyAddressProps;
    response: FindManyAddressResponse;
  };

  /**
   * Route for fetching a single Address by ID \
   * GET `/api/addresses/unique`
   */
  "/addresses/unique": {
    params?: FindUniqueAddressProps;
    response: FindUniqueAddressResponse;
  };
  
  /**
   * Route for fetching the count of addresses \
   * GET `/api/addresses/count`
   */
  "/addresses/count": {
    params?: CountAddressProps;
    response: CountAddressResponse;
  };

  /**
   * Route for fetching a list of articles \
   * GET `/api/articles`
   */
  "/articles": {
    params?: FindManyArticleProps;
    response: FindManyArticleResponse;
  };

  /**
   * Route for fetching a single Article by ID \
   * GET `/api/articles/unique`
   */
  "/articles/unique": {
    params?: FindUniqueArticleProps;
    response: FindUniqueArticleResponse;
  };
  
  /**
   * Route for fetching the count of articles \
   * GET `/api/articles/count`
   */
  "/articles/count": {
    params?: CountArticleProps;
    response: CountArticleResponse;
  };

  /**
   * Route for fetching a list of doItYourselves \
   * GET `/api/doItYourselves`
   */
  "/doItYourselves": {
    params?: FindManyDoItYourselfProps;
    response: FindManyDoItYourselfResponse;
  };

  /**
   * Route for fetching a single DoItYourself by ID \
   * GET `/api/doItYourselves/unique`
   */
  "/doItYourselves/unique": {
    params?: FindUniqueDoItYourselfProps;
    response: FindUniqueDoItYourselfResponse;
  };
  
  /**
   * Route for fetching the count of doItYourselves \
   * GET `/api/doItYourselves/count`
   */
  "/doItYourselves/count": {
    params?: CountDoItYourselfProps;
    response: CountDoItYourselfResponse;
  };

  /**
   * Route for fetching a list of contents \
   * GET `/api/contents`
   */
  "/contents": {
    params?: FindManyContentProps;
    response: FindManyContentResponse;
  };

  /**
   * Route for fetching a single Content by ID \
   * GET `/api/contents/unique`
   */
  "/contents/unique": {
    params?: FindUniqueContentProps;
    response: FindUniqueContentResponse;
  };
  
  /**
   * Route for fetching the count of contents \
   * GET `/api/contents/count`
   */
  "/contents/count": {
    params?: CountContentProps;
    response: CountContentResponse;
  };

  /**
   * Route for fetching a list of categories \
   * GET `/api/categories`
   */
  "/categories": {
    params?: FindManyCategoryProps;
    response: FindManyCategoryResponse;
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

  /**
   * Route for fetching a list of products \
   * GET `/api/products`
   */
  "/products": {
    params?: FindManyProductProps;
    response: FindManyProductResponse;
  };

  /**
   * Route for fetching a single Product by ID \
   * GET `/api/products/unique`
   */
  "/products/unique": {
    params?: FindUniqueProductProps;
    response: FindUniqueProductResponse;
  };
  
  /**
   * Route for fetching the count of products \
   * GET `/api/products/count`
   */
  "/products/count": {
    params?: CountProductProps;
    response: CountProductResponse;
  };

  /**
   * Route for fetching a list of quantities \
   * GET `/api/quantities`
   */
  "/quantities": {
    params?: FindManyQuantityProps;
    response: FindManyQuantityResponse;
  };

  /**
   * Route for fetching a single Quantity by ID \
   * GET `/api/quantities/unique`
   */
  "/quantities/unique": {
    params?: FindUniqueQuantityProps;
    response: FindUniqueQuantityResponse;
  };
  
  /**
   * Route for fetching the count of quantities \
   * GET `/api/quantities/count`
   */
  "/quantities/count": {
    params?: CountQuantityProps;
    response: CountQuantityResponse;
  };

  /**
   * Route for fetching a list of orders \
   * GET `/api/orders`
   */
  "/orders": {
    params?: FindManyOrderProps;
    response: FindManyOrderResponse;
  };

  /**
   * Route for fetching a single Order by ID \
   * GET `/api/orders/unique`
   */
  "/orders/unique": {
    params?: FindUniqueOrderProps;
    response: FindUniqueOrderResponse;
  };
  
  /**
   * Route for fetching the count of orders \
   * GET `/api/orders/count`
   */
  "/orders/count": {
    params?: CountOrderProps;
    response: CountOrderResponse;
  };

  /**
   * Route for fetching a list of fruits \
   * GET `/api/fruits`
   */
  "/fruits": {
    params?: FindManyFruitProps;
    response: FindManyFruitResponse;
  };

  /**
   * Route for fetching a single Fruit by ID \
   * GET `/api/fruits/unique`
   */
  "/fruits/unique": {
    params?: FindUniqueFruitProps;
    response: FindUniqueFruitResponse;
  };
  
  /**
   * Route for fetching the count of fruits \
   * GET `/api/fruits/count`
   */
  "/fruits/count": {
    params?: CountFruitProps;
    response: CountFruitResponse;
  };
};
