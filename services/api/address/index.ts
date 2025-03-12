/**
 * Point d'entrée pour les API de address
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getAddressCount } from './count/route';
import { GET as getAddressList } from './route';
import { GET as getAddressUnique } from './unique/route';

export {
    getAddressCount,
    getAddressList,
    getAddressUnique
}; 