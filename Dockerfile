# Payload 3 + Next.js — production image for Dokploy
FROM node:22-alpine AS base
# libc6-compat is needed by sharp (image processing) on Alpine
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

# ── deps ──
FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# ── build ──
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN echo "website-static contents:" && ls -la website-static | head
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ── run ──
FROM base AS runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
COPY --from=build /app ./
# Guarantee the HTML generator + templates are present at runtime (the site renderer requires them)
COPY website-static ./website-static
RUN echo "runtime website-static:" && ls website-static | head
EXPOSE 3000
# Media volume is mounted at /app/media (see docker-compose / Dokploy)
CMD ["pnpm", "start"]
