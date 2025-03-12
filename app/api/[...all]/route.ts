/**
 * Point d'entrée API pour toutes les routes dynamiques
 * 
 * Ce fichier utilise un système de routage dynamique pour gérer toutes les requêtes API.
 * Il analyse le chemin de la requête et redirige vers le gestionnaire approprié.
 * 
 * Inspiré par l'approche de BetterAuth, ce système permet de centraliser la logique
 * de routage et de simplifier l'architecture des API.
 */
import { NextRequest, NextResponse } from "next/server";
import * as services from "@services/api";

/**
 * Fonction pour obtenir le gestionnaire de route approprié en fonction du chemin
 */
function getRouteHandler(path: string[]): Function | null {
  // Si le chemin est vide, retourner null
  if (path.length === 0) return null;

  // Récupérer le premier segment du chemin (nom du modèle au pluriel)
  const modelPlural = path[0];
  
  // Convertir le nom pluriel en nom singulier avec première lettre majuscule
  // Par exemple: "users" -> "User"
  const modelName = modelPlural.charAt(0).toUpperCase() + modelPlural.slice(1, -1);
  
  // Si le chemin a un seul segment, retourner le gestionnaire principal (liste)
  if (path.length === 1) {
    return (services as any)[`get${modelName}List`] || null;
  }

  // Si le chemin a deux segments, vérifier les sous-routes
  if (path.length === 2) {
    const subRoute = path[1];
    
    if (subRoute === "unique") {
      return (services as any)[`get${modelName}Unique`] || null;
    }
    
    if (subRoute === "count") {
      return (services as any)[`get${modelName}Count`] || null;
    }
  }

  // Si le chemin est plus long ou la sous-route n'est pas reconnue, retourner null
  return null;
}

/**
 * Gestionnaire GET pour toutes les routes
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { all: string[] } }
): Promise<NextResponse> {
  const path = params.all;
  const handler = getRouteHandler(path);

  if (handler) {
    try {
      return handler(request);
    } catch (error) {
      console.error(`Error in route ${path.join('/')}: ${(error as Error).message}`);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Route not found" }, { status: 404 });
} 