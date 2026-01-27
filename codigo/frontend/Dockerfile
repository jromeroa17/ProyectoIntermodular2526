# ---------- Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos SOLO los archivos de dependencias
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código
COPY . .

# Build de producción
RUN npm run build


# ---------- Serve ----------
FROM nginx:alpine

# Borramos config default
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra config
COPY nginx.conf /etc/nginx/conf.d

# Copiamos el build generado
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
