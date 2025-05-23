####################
#       Base       #
####################
FROM node:18-alpine3.21 AS base
WORKDIR /app

# Override environment file
COPY .env.prod ./.env

# Install pnpm and MySQL client
RUN npm install -g pnpm
RUN apk add --no-cache mysql-client mariadb-connector-c

# Install libc6-compat (recommended for Alpine Linux)
RUN apk add --no-cache libc6-compat

####################
#   Dependencies   #
####################
FROM base AS deps

# Import packages and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

####################
#     Builder      #
####################
FROM base AS builder

# Copy codebase
COPY . .

# Import dependencies
COPY --from=deps /app/node_modules ./node_modules

# Generate Prisma client
RUN pnpm run prisma:generate

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

####################
#     Build app    #
####################
CMD ["/bin/sh", "-c", "\
    pnpm run db:setup --docker && \
    pnpm run prisma:deploy && \
    pnpm run fixtures:setup && \
    pnpm run build \
"]
