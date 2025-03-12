/**
 * Point d'entrée pour les API de session
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getSessionCount } from './count/route';
import { GET as getSessionList } from './route';
import { GET as getSessionUnique } from './unique/route';

export {
    getSessionCount,
    getSessionList,
    getSessionUnique
}; 