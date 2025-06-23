# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy workspace package files
COPY package.json package-lock.json ./
COPY packages/landing/package.json ./packages/landing/
COPY packages/shared-ui/package.json ./packages/shared-ui/

# Install dependencies
RUN npm ci
RUN npm install sharp

# Stage 2: Builder
FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_STRAPI_API_TOKEN
ARG NEXT_PUBLIC_STRAPI_URL
ARG STRAPI_INTERNAL_URL

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY . .

# Build landing application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build:landing

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the entire standalone build
COPY --from=builder --chown=nextjs:nodejs /app/packages/landing/.next/standalone ./
# Copy static files to the correct location within the standalone structure
COPY --from=builder --chown=nextjs:nodejs /app/packages/landing/.next/static ./packages/landing/.next/static
# Copy public files to the correct location within the standalone structure  
COPY --from=builder --chown=nextjs:nodejs /app/packages/landing/public ./packages/landing/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3001

# Set hostname
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "packages/landing/server.js"]
