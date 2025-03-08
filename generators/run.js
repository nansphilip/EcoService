#!/usr/bin/env node

/**
 * Script d'exécution pour le générateur
 * 
 * Ce script garantit que les dépendances sont correctement résolues
 * en utilisant le module.paths pour ajouter le dossier node_modules local.
 */

// Ajouter le dossier node_modules local au chemin de recherche des modules
module.paths.push(__dirname + '/node_modules');

// Exécuter le générateur
require('./.build/index.js'); 