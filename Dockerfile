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

# Port can be configured via PORT environment variable (defaults to 80)
ENV PORT=80
CMD ["serve", "-s", "dist", "-l", "$PORT"]