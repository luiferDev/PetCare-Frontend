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

# Use shell form to allow environment variable substitution in CMD
# Add debugging to see what PORT value is being used
# Default to 80 if PORT is not set (for local testing)
CMD echo "Port value: ${PORT:-80}" && serve -s dist -l tcp://0.0.0.0:${PORT:-80}