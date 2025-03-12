/**
 * Point d'entrée pour les API de catégorie
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getCategoryCount } from './CategoryCountApi';
import { GET as getCategoryList } from './CategoryListApi';
import { GET as getCategoryUnique } from './CategoryUniqueApi';

export {
    getCategoryCount,
    getCategoryList,
    getCategoryUnique
};

