FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NEXT_PUBLIC_API_URL=/api
ENV OUTPUT_STANDALONE=1
# 删除本地内部后端地址，部署时在 Vercel / Render 后台填环境变量
# ENV BACKEND_URL=http://backend:8081
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

#EXPOSE 3000
# Next 监听 Render 动态 $PORT
ENTRYPOINT ["sh", "-c", "node server.js -p $PORT"]
