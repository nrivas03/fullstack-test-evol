# Todo List Application - Fullstack

Una aplicación web fullstack de gestión de tareas desarrollada con React + NestJS + PostgreSQL, containerizada con Docker.

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker y Docker Compose instalados
- Make (opcional, para comandos simplificados)

### Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd todo-app
```

2. **Iniciar la aplicación completa**
```bash
make dev
```

Este comando ejecutará:
- Backend (NestJS) en http://localhost:3000
- Frontend (React) en http://localhost:5173
- Base de datos PostgreSQL en puerto 5432

3. **Cargar datos de ejemplo**
```bash
make seed
```

4. **Limpiar base de datos**
```bash
make seed-clean
```

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `make dev` | Inicia toda la aplicación (frontend + backend + DB) |
| `make seed` | Carga datos de ejemplo en la base de datos |
| `make seed-clean` | Vacía completamente la base de datos |
| `make build` | Construye las imágenes Docker |
| `make down` | Detiene todos los contenedores |
| `make logs` | Muestra los logs de todos los servicios |
| `make clean` | Limpia contenedores, imágenes y volúmenes |

## 🌐 URLs de Acceso

### Frontend
- **URL**: http://localhost:5173
- **Tecnologías**: React + Vite + TypeScript + Redux Toolkit + Tailwind CSS

### Backend API
- **URL Base**: http://localhost:3000/api
- **Documentación**: http://localhost:3000/docs (Swagger)
- **Tecnologías**: NestJS + TypeScript + PostgreSQL + Sequelize

### Base de Datos
- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: todoapp
- **Usuario**: postgres
- **Contraseña**: postgres123

## 🛠 API Endpoints

### Tareas (Tasks)
```
GET    /api/tasks              - Obtener todas las tareas
POST   /api/tasks              - Crear nueva tarea
GET    /api/tasks/:id          - Obtener tarea por ID
PUT    /api/tasks/:id          - Actualizar tarea
DELETE /api/tasks/:id          - Eliminar tarea
```

### Filtros disponibles para GET /api/tasks:
- `?completed=true|false` - Filtrar por estado
- `?tag=tagName` - Filtrar por etiqueta
- `?sortBy=createdAt|dueDate|title` - Ordenar por campo
- `?sortOrder=ASC|DESC` - Orden ascendente/descendente

### Etiquetas (Tags)
```
GET    /api/tags               - Obtener todas las etiquetas
```

### Ejemplos de uso de la API:

**Crear tarea:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "tags": ["trabajo", "urgente"],
    "dueDate": "2024-12-31T23:59:59.000Z"
  }'
```

**Obtener tareas filtradas:**
```bash
# Tareas completadas
curl "http://localhost:3000/api/tasks?completed=true"

# Tareas por etiqueta
curl "http://localhost:3000/api/tasks?tag=trabajo"

# Tareas ordenadas por fecha de vencimiento
curl "http://localhost:3000/api/tasks?sortBy=dueDate&sortOrder=ASC"
```

## 📁 Estructura del Proyecto

```
todo-app/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── store/          # Redux store y slices
│   │   ├── services/       # Servicios de API
│   │   ├── hooks/          # Custom hooks
│   │   └── types/          # Definiciones TypeScript
│   ├── package.json
│   └── Dockerfile
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── tasks/          # Módulo de tareas
        ├── tags/           # Módulo de etiquetas
│   │   ├── database/       # Configuración DB y migraciones
│   │   ├── common/         # utilidades compartidas
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml       # Configuración Docker
├── Makefile                # Comandos simplificados
└── README.md
```

## 🔧 Variables de Entorno

### Backend (.env)
```env
# Base de datos
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_DATABASE=todoapp

# Aplicación
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testing

### Backend
```bash
# Ejecutar tests
docker-compose exec backend npm run test

# Tests con cobertura
docker-compose exec backend npm run test:cov
```

### Frontend
```bash
# Ejecutar tests
docker-compose exec frontend npm run test

# Tests con cobertura
docker-compose exec frontend npm run test:coverage
```

## 📱 Características de la Aplicación

### Funcionalidades Implementadas
- ✅ CRUD completo de tareas
- ✅ Sistema de etiquetas
- ✅ Filtros por estado y etiquetas
- ✅ Ordenamiento por fecha y título
- ✅ Fechas de vencimiento
- ✅ Interfaz responsive
- ✅ Estados de carga y manejo de errores
- ✅ Persistencia con Redux y localStorage

### Tecnologías Frontend
- **React 18** con hooks y functional components
- **TypeScript** para tipado estático
- **Redux Toolkit** para gestión de estado global
- **React Router** para navegación
- **Tailwind CSS** para estilos
- **Formik + Yup** para formularios y validación
- **React Testing Library** para testing

### Tecnologías Backend
- **NestJS** con decoradores y módulos
- **TypeScript** con tipado estricto
- **PostgreSQL** como base de datos
- **Sequelize ORM** para mapeo objeto-relacional
- **Class Validator** para validación de DTOs
- **Jest** para testing unitario e integración

## 🐛 Solución de Problemas

### La aplicación no inicia
```bash
# Verificar que Docker esté ejecutándose
docker --version

# Limpiar contenedores existentes
make clean

# Reconstruir e iniciar
make build
make dev
```

### Error de conexión a la base de datos
```bash
# Verificar que el contenedor de PostgreSQL esté corriendo
docker-compose ps

# Reiniciar solo la base de datos
docker-compose restart postgres
```

### Puerto ya en uso
Si los puertos 3000 o 5173 están ocupados, modificar en `docker-compose.yml`:
```yaml
services:
  backend:
    ports:
      - "3001:3000"  # Cambiar puerto externo
  frontend:
    ports:
      - "5174:5173"  # Cambiar puerto externo
```

## 📄 Licencia

Este proyecto es parte de una prueba técnica para Evol Energy.