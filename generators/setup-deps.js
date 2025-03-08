#!/usr/bin/env node

/**
 * Script pour copier les dépendances dans le dossier .build
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Chemin vers le dossier .build
const distPath = path.resolve(__dirname, './.build');

// Créer le dossier .build s'il n'existe pas
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Copier le package.json dans le dossier .build
const packageJson = require('./package.json');

// Garder uniquement les dépendances
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  dependencies: packageJson.dependencies
};

// Écrire le package.json dans le dossier .build
fs.writeFileSync(
  path.join(distPath, 'package.json'),
  JSON.stringify(distPackageJson, null, 2)
);

// Installer les dépendances dans le dossier .build
console.log('Installation des dépendances dans .build...');
execSync('npm install', { cwd: distPath, stdio: 'inherit' });

console.log('Dépendances installées avec succès !'); 