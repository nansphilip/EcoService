#!/usr/bin/env node

/**
 * Point d'entrée du générateur de CRUD et API
 * 
 * Ce script permet de générer automatiquement les fichiers nécessaires pour un modèle Prisma :
 * - Fichier de types avec schémas Zod
 * - Fichier CRUD avec les opérations de base
 * - Fichiers API (liste, unique, count)
 * - Mise à jour du fichier Routes.ts
 * 
 * Il peut être utilisé de plusieurs façons :
 * - Mode interactif : npm run generate
 * - Modèle spécifique : npm run generate -- --model Order
 * - Tous les modèles : npm run generate -- --all
 * - Lister les modèles : npm run generate:list
 * - Générer uniquement les types : npm run generate -- --model Order --type
 * - Générer uniquement le CRUD : npm run generate -- --model Order --crud
 * - Générer uniquement l'API : npm run generate -- --model Order --api
 * - Générer plusieurs éléments : npm run generate -- --model Order --type --crud
 */

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { generateApiFiles } from './api-generator';
import { generateCrudFile } from './crud-generator';
import { parsePrismaSchema, PrismaModel } from './prisma-parser';
import { updateRoutesFile } from './routes-updater';
import { generateTypeFile } from './type-generator';

// Création de l'interface en ligne de commande
const program = new Command();

// Chemin par défaut vers le schéma Prisma (chemin absolu)
const defaultSchemaPath = path.resolve(process.cwd(), '../prisma/schema.prisma');

program
  .name('generate-model')
  .description('Génère les fichiers CRUD et API pour un modèle Prisma')
  .option('-m, --model <modelName>', 'Nom du modèle Prisma à générer')
  .option('-a, --all', 'Génère les fichiers pour tous les modèles Prisma')
  .option('-p, --path <schemaPath>', 'Chemin vers le fichier schema.prisma', defaultSchemaPath)
  .option('-t, --type', 'Génère uniquement le fichier de types')
  .option('-c, --crud', 'Génère uniquement le fichier CRUD')
  .option('-i, --api', 'Génère uniquement les fichiers API')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Démarrage du générateur de CRUD et API...'));
      
      // Analyser le schéma Prisma pour extraire les modèles et leurs champs
      console.log(chalk.blue(`📊 Analyse du schéma Prisma: ${options.path}`));
      const models = await parsePrismaSchema(options.path);
      
      if (models.length === 0) {
        console.log(chalk.yellow('⚠️ Aucun modèle trouvé dans le schéma Prisma.'));
        return;
      }
      
      console.log(chalk.green(`✅ ${models.length} modèles trouvés dans le schéma Prisma.`));
      
      // Déterminer quels fichiers générer
      const generateOptions = {
        type: options.type || (!options.crud && !options.api), // Par défaut si aucun flag spécifique
        crud: options.crud || (!options.type && !options.api), // Par défaut si aucun flag spécifique
        api: options.api || (!options.type && !options.crud),  // Par défaut si aucun flag spécifique
      };
      
      // Si aucun flag n'est spécifié, générer tous les fichiers
      if (!options.type && !options.crud && !options.api) {
        generateOptions.type = true;
        generateOptions.crud = true;
        generateOptions.api = true;
      }
      
      // Si l'option --all est spécifiée, générer pour tous les modèles
      if (options.all) {
        console.log(chalk.blue('🔄 Génération pour tous les modèles...'));
        for (const model of models) {
          await generateFilesForModel(model, generateOptions);
        }
        return;
      }
      
      // Si un modèle spécifique est demandé via l'option --model
      if (options.model) {
        const model = models.find(m => m.name.toLowerCase() === options.model.toLowerCase());
        if (!model) {
          console.log(chalk.red(`❌ Modèle "${options.model}" non trouvé dans le schéma Prisma.`));
          console.log(chalk.yellow('📋 Modèles disponibles:'));
          models.forEach(m => console.log(chalk.yellow(`  - ${m.name}`)));
          return;
        }
        await generateFilesForModel(model, generateOptions);
        return;
      }
      
      // Mode interactif: afficher une liste des modèles disponibles
      const { selectedModel } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedModel',
          message: 'Sélectionnez un modèle à générer:',
          choices: models.map(model => ({
            name: `${model.name} (${model.fields.length} champs)`,
            value: model
          }))
        }
      ]);
      
      // En mode interactif, demander quels fichiers générer
      const { selectedOptions } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedOptions',
          message: 'Quels fichiers souhaitez-vous générer ?',
          choices: [
            { name: 'Types (avec schémas Zod)', value: 'type', checked: true },
            { name: 'CRUD (opérations de base)', value: 'crud', checked: true },
            { name: 'API (routes)', value: 'api', checked: true }
          ]
        }
      ]);
      
      // Si aucune option n'est sélectionnée, générer tous les fichiers
      if (selectedOptions.length === 0) {
        selectedOptions.push('type', 'crud', 'api');
      }
      
      const interactiveOptions = {
        type: selectedOptions.includes('type'),
        crud: selectedOptions.includes('crud'),
        api: selectedOptions.includes('api')
      };
      
      await generateFilesForModel(selectedModel, interactiveOptions);
      
    } catch (error) {
      console.error(chalk.red(`❌ Erreur: ${error.message}`));
      process.exit(1);
    }
  });

// Commande pour lister les modèles disponibles
program
  .command('list')
  .description('Liste les modèles disponibles dans le schéma Prisma')
  .option('-p, --path <schemaPath>', 'Chemin vers le fichier schema.prisma', defaultSchemaPath)
  .action(async (options) => {
    try {
      console.log(chalk.blue(`📊 Analyse du schéma Prisma: ${options.path}`));
      const models = await parsePrismaSchema(options.path);
      
      if (models.length === 0) {
        console.log(chalk.yellow('⚠️ Aucun modèle trouvé dans le schéma Prisma.'));
        return;
      }
      
      console.log(chalk.green(`📋 Modèles disponibles (${models.length}):`));
      models.forEach(model => {
        console.log(chalk.cyan(`  - ${model.name} (${model.fields.length} champs)`));
        // Afficher les champs du modèle
        model.fields.forEach(field => {
          const typeInfo = field.isRequired ? field.type : `${field.type}?`;
          const idInfo = field.isId ? ' (ID)' : '';
          const uniqueInfo = field.isUnique ? ' (UNIQUE)' : '';
          console.log(chalk.gray(`      ${field.name}: ${typeInfo}${idInfo}${uniqueInfo}`));
        });
        console.log('');
      });
    } catch (error) {
      console.error(chalk.red(`❌ Erreur: ${error.message}`));
      process.exit(1);
    }
  });

// Commande pour générer uniquement le fichier de types
program
  .command('type')
  .description('Génère uniquement le fichier de types pour un modèle Prisma')
  .requiredOption('-m, --model <modelName>', 'Nom du modèle Prisma à générer')
  .option('-p, --path <schemaPath>', 'Chemin vers le fichier schema.prisma', defaultSchemaPath)
  .action(async (options) => {
    try {
      console.log(chalk.blue(`📊 Analyse du schéma Prisma: ${options.path}`));
      const models = await parsePrismaSchema(options.path);
      
      const model = models.find(m => m.name.toLowerCase() === options.model.toLowerCase());
      if (!model) {
        console.log(chalk.red(`❌ Modèle "${options.model}" non trouvé dans le schéma Prisma.`));
        return;
      }
      
      await generateTypeFile(model);
      console.log(chalk.green(`\n✅ Génération du fichier de types terminée pour le modèle ${model.name}`));
    } catch (error) {
      console.error(chalk.red(`❌ Erreur: ${error.message}`));
      process.exit(1);
    }
  });

// Commande pour générer uniquement le fichier CRUD
program
  .command('crud')
  .description('Génère uniquement le fichier CRUD pour un modèle Prisma')
  .requiredOption('-m, --model <modelName>', 'Nom du modèle Prisma à générer')
  .option('-p, --path <schemaPath>', 'Chemin vers le fichier schema.prisma', defaultSchemaPath)
  .action(async (options) => {
    try {
      console.log(chalk.blue(`📊 Analyse du schéma Prisma: ${options.path}`));
      const models = await parsePrismaSchema(options.path);
      
      const model = models.find(m => m.name.toLowerCase() === options.model.toLowerCase());
      if (!model) {
        console.log(chalk.red(`❌ Modèle "${options.model}" non trouvé dans le schéma Prisma.`));
        return;
      }
      
      await generateCrudFile(model);
      console.log(chalk.green(`\n✅ Génération du fichier CRUD terminée pour le modèle ${model.name}`));
    } catch (error) {
      console.error(chalk.red(`❌ Erreur: ${error.message}`));
      process.exit(1);
    }
  });

// Commande pour générer uniquement les fichiers API
program
  .command('api')
  .description('Génère uniquement les fichiers API pour un modèle Prisma')
  .requiredOption('-m, --model <modelName>', 'Nom du modèle Prisma à générer')
  .option('-p, --path <schemaPath>', 'Chemin vers le fichier schema.prisma', defaultSchemaPath)
  .action(async (options) => {
    try {
      console.log(chalk.blue(`📊 Analyse du schéma Prisma: ${options.path}`));
      const models = await parsePrismaSchema(options.path);
      
      const model = models.find(m => m.name.toLowerCase() === options.model.toLowerCase());
      if (!model) {
        console.log(chalk.red(`❌ Modèle "${options.model}" non trouvé dans le schéma Prisma.`));
        return;
      }
      
      await generateApiFiles(model);
      await updateRoutesFile(model);
      console.log(chalk.green(`\n✅ Génération des fichiers API terminée pour le modèle ${model.name}`));
    } catch (error) {
      console.error(chalk.red(`❌ Erreur: ${error.message}`));
      process.exit(1);
    }
  });

/**
 * Génère les fichiers nécessaires pour un modèle donné selon les options spécifiées
 * @param model Le modèle Prisma pour lequel générer les fichiers
 * @param options Options de génération (type, crud, api)
 */
async function generateFilesForModel(model: PrismaModel, options = { type: true, crud: true, api: true }) {
  console.log(chalk.blue(`\n📦 Génération des fichiers pour le modèle ${model.name}...`));
  
  // Générer le fichier de types avec les schémas Zod
  if (options.type) {
    await generateTypeFile(model);
  }
  
  // Générer le fichier CRUD avec les opérations de base
  if (options.crud) {
    await generateCrudFile(model);
  }
  
  // Générer les fichiers API (liste, unique, count) et mettre à jour Routes.ts
  if (options.api) {
    await generateApiFiles(model);
    await updateRoutesFile(model);
  }
  
  console.log(chalk.green(`\n✅ Génération terminée pour le modèle ${model.name}`));
}

// Lancer le programme
program.parse(); 