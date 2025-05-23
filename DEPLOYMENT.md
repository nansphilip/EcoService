# Guide de Déploiement EcoService

## Architecture Optimisée

Cette configuration utilise une approche multi-stage build optimisée pour la production avec support Docker Swarm et Coolify.

### Structure des Fichiers

- `compose.dev.yml` - Configuration développement
- `compose.prod.yml` - Configuration production avec support Docker Swarm
- `coolify.yml` - Configuration spécifique pour Coolify
- `docker/Dockerfile.dev` - Image de développement
- `docker/Dockerfile.prod` - Image de production optimisée (multi-stage)

## Environnements

### 1. Développement Local (sans Docker)

```bash
pnpm run dev
```

### 2. Développement avec Docker

```bash
make dev
# ou
docker compose -f compose.dev.yml --env-file .env.dev up -d
```

### 3. Production Locale

```bash
make prod
# ou
docker compose -f compose.prod.yml --env-file .env.prod up -d
```

### 4. Docker Swarm

#### Initialiser le Swarm

```bash
docker swarm init
```

#### Déployer

```bash
make swarm-deploy
# ou
docker stack deploy -c compose.prod.yml eco-service
```

#### Mise à jour (Rolling Update)

```bash
make swarm-update
# ou
docker service update --image eco-service:latest eco-service_nextjs
```

#### Supprimer

```bash
make swarm-down
# ou
docker stack rm eco-service
```

## Optimisations de Production

### Multi-stage Build

1. **Base** - Image Node.js avec pnpm
2. **Dependencies** - Installation des dépendances
3. **Builder** - Build de l'application avec Prisma
4. **Runner** - Image finale optimisée avec seulement les fichiers nécessaires

### Avantages

- ✅ Image finale plus petite (~200MB vs ~800MB)
- ✅ Sécurité renforcée (utilisateur non-root)
- ✅ Build sans dépendance à MySQL
- ✅ Support des rolling updates
- ✅ Health checks intégrés

## Déploiement avec Coolify

### Configuration

1. Connectez votre repository Git à Coolify
2. Utilisez le fichier `coolify.yml` comme configuration
3. Définissez les variables d'environnement :
    - `MYSQL_DATABASE`
    - `MYSQL_USER`
    - `MYSQL_PASSWORD`
    - `MYSQL_ROOT_PASSWORD`

### Rolling Updates

Coolify supporte automatiquement les rolling updates grâce à :

- Health checks sur `/api/health`
- Configuration `restart: unless-stopped`
- Build optimisé multi-stage

## Variables d'Environnement

### Développement (.env.dev)

```env
NODE_ENV=development
MYSQL_DATABASE=ecoservicedev
MYSQL_USER=dev
MYSQL_PASSWORD=devpass
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_PORT=3307
```

### Production (.env.prod)

```env
NODE_ENV=production
MYSQL_DATABASE=ecoserviceprod
MYSQL_USER=prod
MYSQL_PASSWORD=strongpass
MYSQL_ROOT_PASSWORD=strongrootpass
MYSQL_PORT=3306
```

## Monitoring

### Health Check

- Endpoint : `GET /api/health`
- Retourne : Status, timestamp, uptime, environment

### Logs

```bash
# Logs Next.js
make nextjs-logs

# Logs MySQL
make mysql-logs

# Logs Docker Swarm
docker service logs eco-service_nextjs
```

## Commandes Utiles

```bash
# Build l'image de production
make build-prod

# Accéder au conteneur Next.js
make nextjs-it

# Accéder à MySQL
make mysql-db-shell

# Recharger les certificats SSL
make certs-reload
```

## Compatibilité

- ✅ Docker Swarm
- ✅ Coolify
- ✅ Kubernetes (avec adaptations mineures)
- ✅ Rolling updates
- ✅ Auto-scaling horizontal
