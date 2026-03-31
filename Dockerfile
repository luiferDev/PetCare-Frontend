# ============================================
# Stage 1: Build
# ============================================
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy dependency files first (layer caching)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

RUN pnpm run build

# ============================================
# Stage 2: Production (minimal image)
# ============================================
FROM node:22-alpine

RUN npm install -g serve

WORKDIR /app

# Only copy the built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Port can be configured via PORT environment variable (defaults to 80 for Dokploy)
ENV PORT=80
# Use shell form to allow environment variable substitution in CMD
# Add debugging to see what PORT value is being used
CMD echo "Port value: $PORT" && serve -s dist -l tcp://0.0.0.0:$PORT