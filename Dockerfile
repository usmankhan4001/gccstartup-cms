# Payload 3 + Next.js — production image for Dokploy
FROM node:20-alpine AS base
# libc6-compat is needed by sharp (image processing) on Alpine
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

# ── deps ──
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# ── build ──
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ── run ──
FROM base AS runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
COPY --from=build /app ./
EXPOSE 3000
# Media volume is mounted at /app/media (see docker-compose / Dokploy)
CMD ["pnpm", "start"]
