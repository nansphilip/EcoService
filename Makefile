####################
#      Config      #
####################

.PHONY: dev prod swarm-deploy swarm-update swarm-down certs-setup certs-reset certs-reload nextjs-logs nextjs-it nextjs-db-shell mysql-logs mysql-it mysql-db-shell

# Enable compose bake for better performance
DOCKER_COMP_BAKE = COMPOSE_BAKE=true

####################
#    Certificates  #
####################

# Generate SSL certificates if needed
certs-setup:
	@ ./docker/generate-mysql-ssl-certs.bash

# Reset the certs
certs-reset:
	@ echo "🧹 Resetting certs..."
	@ rm -rf ./docker/certs
	@ echo "🫧 Certs reset"

# Reload the certs
certs-reload:
	@ $(MAKE) certs-reset
	@ $(MAKE) certs-setup

####################
#    Environment   #
####################

# Run the dev environment
dev:
	@ $(MAKE) certs-setup
	@ $(DOCKER_COMP_BAKE) docker compose -f compose.dev.yml up --build -d

# Run the prod environment
prod:
	@ $(MAKE) certs-setup
	@ $(DOCKER_COMP_BAKE) docker compose -f compose.prod.yml up --build -d

# Stop the dev environment
stop-dev:
	@ docker compose -f compose.dev.yml down

# Stop the prod environment
stop-prod:
	@ docker compose -f compose.prod.yml down

# Remove the dev environment
rm-dev:
	@ docker compose -f compose.dev.yml down -v

# Remove the prod environment
rm-prod:
	@ docker compose -f compose.prod.yml down -v

####################
#    Containers    #
####################

# Show the nextjs logs
nextjs-logs:
	@ docker logs -f nextjs

# Show the mysql logs
mysql-logs:
	@ docker logs -f mysql

# Connect to the nextjs container
nextjs-it:
	@ docker exec -it nextjs sh

# Connect to the mysql container
mysql-it:
	@ docker exec -it mysql sh

# Connect to the mysql instance through the nextjs container
nextjs-db-shell:
	@ docker exec -it nextjs sh -c " \
	    mysql -u root -p${MYSQL_ROOT_PASSWORD} -h mysql \
	    --ssl-ca=/app/docker/certs/ca.pem \
	    --ssl-cert=/app/docker/certs/client-cert.pem \
	    --ssl-key=/app/docker/certs/client-key.pem \
	"

# Connect to the mysql instance through the mysql container
mysql-db-shell:
	@ docker exec -it mysql bash -c "mysql -u root -p${MYSQL_ROOT_PASSWORD}"

####################
#   Docker Swarm   #
####################

# # Deploy to Docker Swarm
# swarm-deploy:
# 	@ $(MAKE) certs-setup
# 	@ echo "🚀 Deploying to Docker Swarm..."
# 	@ docker stack deploy -c compose.prod.yml --with-registry-auth eco-service

# # Update Docker Swarm deployment (rolling update)
# swarm-update:
# 	@ echo "🔄 Updating Docker Swarm deployment..."
# 	@ docker service update --image eco-service:latest eco-service_nextjs

# # Remove from Docker Swarm
# swarm-down:
# 	@ echo "🛑 Removing from Docker Swarm..."
# 	@ docker stack rm eco-service

# # Build production image
# build-prod:
# 	@ $(MAKE) certs-setup
# 	@ echo "🏗️ Building production image..."
# 	@ docker build -f docker/Dockerfile.prod -t eco-service:latest .
