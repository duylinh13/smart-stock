FROM node:24-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# We must build with Next.js, and pass NEXT_PUBLIC_API_URL or similar if needed.
# For Docker Compose, NEXT_PUBLIC_API_URL is typically provided at build time or mapped at runtime via a proxy,
# but Next.js bakes it in at build time. We will just use the default.
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
