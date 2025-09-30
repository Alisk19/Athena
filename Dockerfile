# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install --no-audit --no-fund
COPY . .
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["npm","run","dev"]


