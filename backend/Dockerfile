# Dockerfile para Backend (NestJS)
FROM node:20 AS development

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=development

# Copiar código fuente
COPY . .

# Generar build de Prisma (si usas Prisma) - comentar si no lo usas
# RUN npx prisma generate

# Exponer puerto
EXPOSE 3000

# Comando por defecto para desarrollo
CMD ["npm", "run", "start:dev"]

# Etapa de producción
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

# Build de la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Cambiar propiedad de archivos
USER nestjs

# Comando para producción
CMD ["node", "dist/main"]