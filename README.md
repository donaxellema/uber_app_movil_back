# Skyfast Backend

Backend de la plataforma de transporte Skyfast desarrollado con NestJS, PostgreSQL y TypeORM.

---

## 📋 Requisitos Previos

- Node.js 18+ o superior
- PostgreSQL 13+
- Redis 7+ (opcional)
- npm o yarn

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar el archivo de ejemplo y configurar las variables:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```bash
# Application
NODE_ENV=development
PORT=3000

# Database PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=skyfast_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
```

### 3. Crear la base de datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE skyfast_db;

# Salir
\q
```

---

## 🗄️ Gestión de Base de Datos

### Sincronización de esquemas (Desarrollo)

En modo desarrollo, TypeORM sincroniza automáticamente los esquemas:

```bash
# El esquema se sincroniza automáticamente al iniciar
npm run start:dev
```

**⚠️ IMPORTANTE**: La sincronización automática está **deshabilitada en producción**. En producción se deben usar migraciones.

### Migraciones (Producción)

#### Generar una migración

```bash
# Generar migración basada en cambios de entidades
npm run typeorm migration:generate -- -n NombreDeLaMigracion

# O crear una migración vacía
npm run typeorm migration:create -- -n NombreDeLaMigracion
```

#### Ejecutar migraciones

```bash
# Ejecutar todas las migraciones pendientes
npm run typeorm migration:run

# Revertir la última migración
npm run typeorm migration:revert
```

#### Ver estado de migraciones

```bash
# Ver migraciones ejecutadas
npm run typeorm migration:show
```

### Resetear base de datos (Solo desarrollo)

```bash
# CUIDADO: Esto eliminará todos los datos
npm run typeorm schema:drop
npm run start:dev  # Recreará las tablas
```

---

## 💻 Desarrollo

### Iniciar en modo desarrollo

```bash
# Modo watch con hot-reload
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000/api/v1`

### Compilar el proyecto

```bash
npm run build
```

### Otros comandos útiles

```bash
# Formatear código
npm run format

# Linter
npm run lint

# Linter con corrección automática
npm run lint -- --fix
```

---

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

---

## 📮 Postman Collection

### Importar colección en Postman

Se incluyen archivos de Postman para probar la API:

1. **Colección de endpoints**: `Skyfast-API.postman_collection.json`
2. **Entorno Local**: `Skyfast-Local.postman_environment.json`
3. **Entorno Producción**: `Skyfast-Production.postman_environment.json`

### Pasos para importar:

1. Abrir Postman
2. Click en **Import** (botón superior izquierdo)
3. Arrastrar los archivos `.json` o seleccionarlos
4. Seleccionar el entorno (Local o Production) en el dropdown superior derecho

### Características de la colección:

✅ **Auto-guardar tokens**: Los tokens de autenticación se guardan automáticamente  
✅ **Variables de entorno**: baseUrl, accessToken, refreshToken, userId  
✅ **Carpetas organizadas**: Auth, Users, Health Check  
✅ **Scripts de prueba**: Guardan tokens automáticamente después del login/register  
✅ **Descripciones**: Cada endpoint tiene descripción de su función  

### Uso rápido:

1. Importar la colección y el entorno Local
2. Ejecutar **Auth > Register User** o **Auth > Login**
3. Los tokens se guardan automáticamente
4. Todos los demás endpoints usarán el token automáticamente

---

## 🏗️ Estructura del Proyecto

```
src/
├── modules/              # Módulos de la aplicación
│   ├── auth/            # Autenticación y autorización
│   ├── users/           # Gestión de usuarios
│   ├── drivers/         # Gestión de conductores
│   ├── vehicles/        # Gestión de vehículos
│   ├── trips/           # Gestión de viajes
│   └── ...
├── common/              # Código compartido
│   ├── decorators/      # Decoradores personalizados
│   ├── entities/        # Entidades base
│   ├── enums/          # Enumeraciones
│   ├── guards/         # Guards
│   ├── interceptors/   # Interceptores
│   └── pipes/          # Pipes
├── config/             # Configuración
│   └── database.config.ts
├── app.module.ts       # Módulo principal
└── main.ts            # Bootstrap
```

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### Autenticación

#### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {refreshToken}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {accessToken}
```

### Usuarios

#### Obtener perfil
```http
GET /users/profile
Authorization: Bearer {accessToken}
```

#### Actualizar perfil
```http
PATCH /users/profile
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

#### Listar usuarios (Solo Admin)
```http
GET /users
Authorization: Bearer {accessToken}
```

---

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) con dos tipos de tokens:

### Access Token
- **Duración**: 15 minutos
- **Uso**: Autenticación de requests
- **Header**: `Authorization: Bearer {accessToken}`

### Refresh Token
- **Duración**: 7 días
- **Uso**: Renovación de access token
- **Endpoint**: `POST /auth/refresh`

### Roles

```typescript
enum UserRole {
  USER = 'USER',              // Cliente
  DRIVER = 'DRIVER',          // Conductor
  ADMIN = 'ADMIN',            // Administrador
  SUPER_ADMIN = 'SUPER_ADMIN' // Super Administrador
}
```

### Protección de rutas

```typescript
// Ruta pública (sin autenticación)
@Public()
@Get()
findAll() { ... }

// Ruta protegida por rol
@Roles(UserRole.ADMIN)
@Get('admin')
adminOnly() { ... }
```

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run start           # Iniciar
npm run start:dev       # Iniciar con watch mode
npm run start:debug     # Iniciar con debug

# Producción
npm run build          # Compilar
npm run start:prod     # Iniciar en producción

# Calidad de código
npm run format         # Formatear con Prettier
npm run lint          # Linter con ESLint

# Testing
npm run test          # Tests unitarios
npm run test:watch    # Tests en modo watch
npm run test:cov      # Tests con cobertura
npm run test:e2e      # Tests end-to-end
```

---

## 🛠️ Stack Tecnológico

- **Framework**: NestJS 11.x
- **Lenguaje**: TypeScript 5.7
- **Base de datos**: PostgreSQL 13+
- **ORM**: TypeORM 0.3.28
- **Autenticación**: JWT con Passport
- **Validación**: class-validator + class-transformer
- **Hash**: bcrypt
- **WebSockets**: Socket.IO 4.8.3

---

## 🔧 Configuración de TypeORM

### Configuración actual

La configuración de TypeORM se encuentra en `src/config/database.config.ts`:

```typescript
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,  // Siempre false en producción
  logging: process.env.NODE_ENV === 'development',
};
```

### Entidades

Las entidades TypeORM deben:
1. Extender de `AbstractEntity` para campos de auditoría
2. Usar el decorador `@Entity('nombre_tabla')`
3. Ubicarse en `src/modules/{modulo}/entities/`

Ejemplo:

```typescript
import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/base.entity';

@Entity('mi_tabla')
export class MiEntidad extends AbstractEntity {
  @Column()
  nombre: string;
}
```

---

## 🌍 Variables de Entorno

### Variables Requeridas

```bash
# Aplicación
NODE_ENV=development|production
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=skyfast_db

# JWT
JWT_SECRET=secret-key-change-in-production
JWT_REFRESH_SECRET=refresh-secret-key-change-in-production

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Variables Opcionales

```bash
# Redis (para cache y sesiones)
REDIS_HOST=localhost
REDIS_PORT=6379

# Google Maps API
GOOGLE_MAPS_API_KEY=your-api-key

# Stripe
STRIPE_SECRET_KEY=your-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Firebase (notificaciones)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-password
MAIL_FROM=noreply@skyfast.com
```

---

## 🚦 Estado del Proyecto

### Módulos Implementados

- ✅ **AuthModule**: Autenticación completa con JWT
- ✅ **UsersModule**: Gestión de usuarios con CRUD
- ⏳ **DriversModule**: En desarrollo
- ⏳ **VehiclesModule**: Pendiente
- ⏳ **TripsModule**: Pendiente
- ⏳ **PaymentsModule**: Pendiente
- ⏳ **Socket.IO**: Pendiente

### Funcionalidades

- ✅ Registro de usuarios
- ✅ Login con email/teléfono
- ✅ JWT Access Token + Refresh Token
- ✅ Guards de autenticación
- ✅ Control de acceso por roles
- ✅ Soft delete
- ✅ Validación de DTOs
- ✅ CORS configurado
- ⏳ WebSockets tiempo real
- ⏳ Notificaciones push
- ⏳ Integración con Stripe
- ⏳ Sistema de viajes

---

## 📝 Notas Importantes

### Seguridad

- ⚠️ Cambiar `JWT_SECRET` y `JWT_REFRESH_SECRET` en producción
- ⚠️ Nunca commitear el archivo `.env`
- ⚠️ Usar HTTPS en producción
- ⚠️ Deshabilitar `synchronize: true` en producción
- ⚠️ Implementar rate limiting para APIs públicas

### Base de Datos

- En **desarrollo**: `synchronize: true` (auto-sincroniza esquemas)
- En **producción**: `synchronize: false` (usar migraciones)
- Los campos sensibles (password, tokens) están excluidos de las respuestas con `@Exclude()`
- Todas las entidades usan UUID como primary key
- Soft delete implementado con `deletedAt`

### Desarrollo

- El servidor se reinicia automáticamente en modo dev al detectar cambios
- Los logs de SQL solo aparecen en modo desarrollo
- CORS está configurado para permitir orígenes específicos
- Validación global de DTOs activada con whitelist

---

## 🐛 Troubleshooting

### Puerto ya en uso

```bash
# Cambiar el puerto en .env
PORT=3001
```

### Error de conexión a PostgreSQL

```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar credenciales en .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=skyfast_db
```

### Error: relation "users" does not exist

```bash
# La base de datos no está sincronizada
# Asegurarse de que NODE_ENV=development
# Reiniciar el servidor
npm run start:dev
```

### TypeORM no encuentra las entidades

```bash
# Asegurarse de compilar el proyecto
npm run build

# Verificar que las entidades estén en dist/**/*.entity.js
```

---

## 📚 Documentación Adicional

- [Documentación Técnica Completa](../docs/Backend/DOCUMENTACION-TECNICA.md)
- [Log de Sesiones](../docs/LOG-SESIONES.md)
- [Planificación del Proyecto](../docs/PLANIFICACION.md)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)

---

**Versión**: 0.0.1  
**Última actualización**: 2026-01-09
