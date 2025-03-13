/**
 * Point d'entrée pour toutes les API
 * 
 * Ce fichier exporte toutes les API, permettant de les importer
 * depuis "@services/api" plutôt que depuis leurs dossiers individuels.
 * 
 * À mesure que de nouvelles API sont ajoutées, elles doivent être exportées ici.
 */
export * from './account';
export * from './address';
export * from './article';
export * from './category';
export * from './content';
export * from './doItYourself';
export * from './fruit';
export * from './order';
export * from './product';
export * from './quantity';
export * from './session';
export * from './user';
export * from './verification';

/**
 * Exports des gestionnaires d'API pour le système de routage dynamique
 * 
 * Ce fichier exporte tous les gestionnaires d'API pour qu'ils puissent être
 * utilisés par le système de routage dynamique dans app/api/[...all]/route.ts.
 * 
 * Chaque export doit suivre la convention de nommage:
 * - getModelList: pour les routes principales (ex: /products)
 * - getModelUnique: pour les routes uniques (ex: /products/unique)
 * - getModelCount: pour les routes de comptage (ex: /products/count)
 */

// Produits
export { GET as getProductCount } from "./product/count/route";
export { GET as getProductList } from "./product/route";
export { GET as getProductUnique } from "./product/unique/route";

// Catégories
export { GET as getCategoryCount } from "./category/count/route";
export { GET as getCategoryList } from "./category/route";
export { GET as getCategoryUnique } from "./category/unique/route";

// Articles
export { GET as getArticleCount } from "./article/count/route";
export { GET as getArticleList } from "./article/route";
export { GET as getArticleUnique } from "./article/unique/route";

// Utilisateurs
export { GET as getUserCount } from "./user/count/route";
export { GET as getUserList } from "./user/route";
export { GET as getUserUnique } from "./user/unique/route";

// Commandes
export { GET as getOrderCount } from "./order/count/route";
export { GET as getOrderList } from "./order/route";
export { GET as getOrderUnique } from "./order/unique/route";

// Autres exports selon les besoins...
