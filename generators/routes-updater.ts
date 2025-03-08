/**
 * Module de mise à jour du fichier Routes.ts
 * 
 * Ce module met à jour le fichier Routes.ts pour inclure les nouvelles routes
 * générées pour un modèle Prisma.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PrismaModel } from './prisma-parser';

/**
 * Met à jour le fichier Routes.ts pour inclure les routes d'un modèle
 * @param model Le modèle Prisma pour lequel ajouter les routes
 */
export async function updateRoutesFile(model: PrismaModel): Promise<void> {
  try {
    console.log(chalk.blue(`📝 Mise à jour du fichier Routes.ts pour ${model.name}...`));
    
    // Chemin absolu vers le répertoire racine du projet
    const rootDir = path.resolve(process.cwd(), '..');
    
    const routesPath = path.join(rootDir, 'app/api/Routes.ts');
    
    // Vérifier si le fichier existe
    if (!await fs.pathExists(routesPath)) {
      throw new Error(`Le fichier Routes.ts n'existe pas: ${routesPath}`);
    }
    
    let content = await fs.readFile(routesPath, 'utf8');
    const modelNameLower = model.name.toLowerCase();
    
    // Vérifier si les routes existent déjà
    if (content.includes(`"/${modelNameLower}"`)) {
      console.log(chalk.yellow(`⚠️ Les routes pour ${model.name} existent déjà dans Routes.ts`));
      return;
    }
    
    // Ajouter les imports
    const importStatement = `import { Select${model.name}AmountProps, Select${model.name}ListProps, Select${model.name}Props } from "@actions/types/${model.name}";
import { Select${model.name}AmountResponse } from "@app/api/${modelNameLower}/count/route";
import { Select${model.name}ListResponse } from "@app/api/${modelNameLower}/route";
import { Select${model.name}Response } from "@app/api/${modelNameLower}/unique/route";`;
    
    // Trouver un bon endroit pour insérer les imports
    // Chercher le dernier import pour insérer après
    const importRegex = /import.*from.*;\n/g;
    let lastImportMatch;
    let lastImportIndex = 0;
    
    // Trouver le dernier import dans le fichier
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportMatch = match;
      lastImportIndex = match.index + match[0].length;
    }
    
    if (!lastImportMatch) {
      throw new Error("Impossible de trouver un endroit approprié pour insérer les imports");
    }
    
    // Insérer les imports après le dernier import trouvé
    content = 
      content.substring(0, lastImportIndex) + 
      importStatement + "\n" + 
      content.substring(lastImportIndex);
    
    // Ajouter les routes
    const routesDefinition = `
    /**
     * Route for fetching a list of ${modelNameLower}s
     * GET /api/${modelNameLower}
     */
    "/${modelNameLower}": {
        params?: Select${model.name}ListProps;
        response: Select${model.name}ListResponse;
    };
    /**
     * Route for fetching a single ${modelNameLower} by ID
     * GET /api/${modelNameLower}/unique
     */
    "/${modelNameLower}/unique": {
        params?: Select${model.name}Props;
        response: Select${model.name}Response;
    };
    /**
     * Route for fetching the count of ${modelNameLower}s
     * GET /api/${modelNameLower}/count
     */
    "/${modelNameLower}/count": {
        params?: Select${model.name}AmountProps;
        response: Select${model.name}AmountResponse;
    };`;
    
    // Trouver la fin de l'objet Routes pour insérer les nouvelles routes
    const routesEndIndex = content.lastIndexOf('};');
    
    if (routesEndIndex === -1) {
      throw new Error("Impossible de trouver la fin de l'objet Routes");
    }
    
    // Insérer les routes avant la fin de l'objet Routes
    content = 
      content.substring(0, routesEndIndex) + 
      routesDefinition + 
      content.substring(routesEndIndex);
    
    // Écrire le fichier mis à jour
    await fs.writeFile(routesPath, content);
    console.log(chalk.green(`✅ Fichier Routes.ts mis à jour avec les routes pour ${model.name}`));
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du fichier Routes.ts: ${error.message}`);
  }
} 