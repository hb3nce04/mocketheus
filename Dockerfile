FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install

FROM base AS frontend-builder
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm run build

FROM base AS backend-builder
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

# Csak a production node_modules-t visszük át (opcionális, de ajánlott)
COPY --from=base /app/node_modules ./node_modules
# Átmásoljuk a lefordított kódokat
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
# Átmásoljuk a nem-TS fájlokat (pl. views, ha vannak)
COPY --from=backend-builder /app/backend/src/views ./backend/dist/views
COPY --from=backend-builder /app/backend/package.json ./backend/

EXPOSE 3000
# Indítás a lefordított JS-sel (már nem tsx vagy ts-node-dev!)
CMD ["node", "backend/dist/server.js"]
