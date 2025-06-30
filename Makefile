# Makefile para gestión de Docker Compose
.PHONY: help build up down restart logs clean dev prod

# Variables
COMPOSE_FILE=docker-compose.yml
COMPOSE_FILE_PROD=docker-compose.prod.yml

# Ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make dev        - Levantar entorno de desarrollo"
	@echo "  make prod       - Levantar entorno de producción"
	@echo "  make build      - Construir todas las imágenes"
	@echo "  make up         - Levantar todos los servicios"
	@echo "  make down       - Bajar todos los servicios"
	@echo "  make restart    - Reiniciar todos los servicios"
	@echo "  make logs       - Ver logs de todos los servicios"
	@echo "  make logs-f     - Ver logs en tiempo real"
	@echo "  make logs-back  - Ver logs del backend"
	@echo "  make logs-front - Ver logs del frontend"
	@echo "  make clean      - Limpiar contenedores, imágenes y volúmenes"
	@echo "  make shell-back - Acceder al shell del backend"
	@echo "  make shell-front- Acceder al shell del frontend"
	@echo "  make shell-db   - Acceder al shell de PostgreSQL"

# Desarrollo
dev:
	@echo "🚀 Levantando entorno de desarrollo..."
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "✅ Entorno de desarrollo listo!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3000"
	@echo "pgAdmin: http://localhost:8080"

# Producción
prod:
	@echo "🚀 Levantando entorno de producción..."
	docker-compose -f $(COMPOSE_FILE_PROD) up -d
	@echo "✅ Entorno de producción listo!"

# Construir imágenes
build:
	@echo "🔨 Construyendo imágenes..."
	docker-compose -f $(COMPOSE_FILE) build --no-cache

build-prod:
	@echo "🔨 Construyendo imágenes para producción..."
	docker-compose -f $(COMPOSE_FILE_PROD) build --no-cache

# Levantar servicios
up:
	docker-compose -f $(COMPOSE_FILE) up -d

up-prod:
	docker-compose -f $(COMPOSE_FILE_PROD) up -d

# Bajar servicios
down:
	docker-compose -f $(COMPOSE_FILE) down

down-prod:
	docker-compose -f $(COMPOSE_FILE_PROD) down

# Reiniciar servicios
restart:
	docker-compose -f $(COMPOSE_FILE) restart

restart-backend:
	docker-compose -f $(COMPOSE_FILE) restart backend

restart-frontend:
	docker-compose -f $(COMPOSE_FILE) restart frontend

# Ver logs
logs:
	docker-compose -f $(COMPOSE_FILE) logs

logs-f:
	docker-compose -f $(COMPOSE_FILE) logs -f

logs-back:
	docker-compose -f $(COMPOSE_FILE) logs backend

logs-front:
	docker-compose -f $(COMPOSE_FILE) logs frontend

logs-db:
	docker-compose -f $(COMPOSE_FILE) logs postgres

# Acceder a shells
shell-back:
	docker-compose -f $(COMPOSE_FILE) exec backend sh

shell-front:
	docker-compose -f $(COMPOSE_FILE) exec frontend sh

shell-db:
	docker-compose -f $(COMPOSE_FILE) exec postgres psql -U postgres -d todo_db

# Limpiar
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	docker-compose -f $(COMPOSE_FILE) down -v
	docker system prune -af
	@echo "✅ Limpieza completada!"

# Instalar dependencias
install-back:
	docker-compose -f $(COMPOSE_FILE) exec backend npm install

install-front:
	docker-compose -f $(COMPOSE_FILE) exec frontend npm install

# Ejecutar tests
test-back:
	docker-compose -f $(COMPOSE_FILE) exec backend npm run test

test-front:
	docker-compose -f $(COMPOSE_FILE) exec frontend npm run test

# Ejecutar migraciones
migrate:
	docker-compose -f $(COMPOSE_FILE) exec backend npm run migration:run

migrate-create:
	docker-compose -f $(COMPOSE_FILE) exec backend npm run migration:create

# Seed de datos
seed:
	docker-compose -f $(COMPOSE_FILE) exec backend npm run db:seed

# Seed clean
seed-clean:
	docker-compose -f $(COMPOSE_FILE) exec backend npm run db:clear