# Fullstack TP – Product Catalogue (Angular + Next.js + Express + Prisma + PostgreSQL)

A complete fullstack monorepo featuring a REST API backend with Express 5, Prisma 7, and PostgreSQL 17, alongside two front-ends (Angular 22 and Next.js 16) with product catalogues, search, filtering, pagination, and an administrative CRUD dashboard.

```
fullstack-tp/
├── api/            # Express 5 REST API + Prisma 7 + PostgreSQL  → http://localhost:4000
├── ngapp/          # Angular 22 + Bootstrap 5                    → http://localhost:4200
├── nxapp/          # Next.js 16 + Tailwind CSS                   → http://localhost:3000
└── docker-compose.yml  # Orchestrates PostgreSQL, API, and both front-ends
```

---

## 🚀 Running with Docker Compose (Recommended)

To start the whole stack (Database, API, Angular, Next.js) with a single command:

```bash
docker compose up --build
```

- **PostgreSQL 17**: `localhost:5432` (user: `app`, password: `app`, db: `shop`)
- **Express REST API**: [http://localhost:4000/api](http://localhost:4000/api)
- **Angular App**: [http://localhost:4200](http://localhost:4200)
- **Next.js App**: [http://localhost:3000](http://localhost:3000)

To stop and remove containers:
```bash
docker compose down
# or to also remove persistent database volume:
docker compose down -v
```

---

## 💻 Running Locally

### 1. Database (PostgreSQL)

Start PostgreSQL using Docker:
```bash
docker compose up -d db
```

### 2. Backend API (`api`)

```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed          # Seeds 100 products from DummyJSON into PostgreSQL
npm run dev                 # Starts tsx watch on http://localhost:4000
```

To inspect and edit data in the browser:
```bash
npx prisma studio
```

### 3. Angular Front-End (`ngapp`)

```bash
cd ngapp
npm install
npm start                   # Serves on http://localhost:4200
```

### 4. Next.js Front-End (`nxapp`)

```bash
cd nxapp
npm install
npm run dev                 # Serves on http://localhost:3000
```

---

## 📡 REST API Endpoints

The API is structured in layers (`routes` → `middlewares/validate` → `services` → `prisma` → `PostgreSQL`).

| Action | Verb + URL | Success Status | Description |
|---|---|---|---|
| Health Check | `GET /api/health` | `200 OK` | Verifies API is running (`{"status":"ok"}`) |
| List Products | `GET /api/products` | `200 OK` | Supports pagination (`?limit=12&skip=0`), search (`?q=phone`), and category (`?category=smartphones`) |
| List Categories | `GET /api/categories` | `200 OK` | Returns categories with product counts (`_count`) |
| Read Product | `GET /api/products/:id` | `200 OK` | Product details with associated Category |
| Create Product | `POST /api/products` | `201 Created` | Validated by Zod (`title`, `price`, `description`, `thumbnail`, `category`) |
| Update Product | `PATCH /api/products/:id` | `200 OK` | Partial update validated by Zod |
| Delete Product | `DELETE /api/products/:id` | `204 No Content` | Removes product from database |
| Register User | `POST /api/auth/register` | `201 Created` | Hashes password with bcrypt and returns JWT token |
| Login User | `POST /api/auth/login` | `200 OK` | Validates credentials and returns JWT token |
| Current User | `GET /api/auth/me` | `200 OK` | Protected with Bearer JWT token |

### Testing with `requests.http`

Use the VS Code / IDE **REST Client** extension to execute the requests in [api/requests.http](file:///c:/Users/kheli/OneDrive/Bureau/Master1/fullstack-tp/api/requests.http).

---

## 🔑 Environment Variables

### API (`api/.env`)
```env
DATABASE_URL="postgresql://app:app@localhost:5432/shop?schema=public"
PORT=4000
JWT_SECRET=supersecret_jwt_key_for_development_purposes
```

### Angular (`ngapp/src/environments/environment.ts`)
```ts
export const environment = {
  apiUrl: 'http://localhost:4000/api',
};
```

### Next.js (`nxapp/.env.local`)
```env
API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 🛡️ Architecture & Features

- **Layered Backend Architecture**: Strict separation of concern between HTTP routing (`routes/`), request validation with Zod (`middlewares/validate.ts`), business logic & data access (`services/`), and ORM mapping (`lib/prisma.ts`).
- **Data Modeling & Migrations**: Declarative schema in `prisma/schema.prisma` with `Product`, `Category` (1-to-many relation), and `User` models.
- **Robust Error Handling**: Central error middleware mapping Prisma `P2025` errors to clean 404 responses and Zod schema issues to detailed 400 responses.
- **Admin Dashboards**: Both Angular (`/admin`) and Next.js (`/admin`) provide interactive forms to create, edit, and delete products directly in the PostgreSQL database.
- **Full Dockerization**: Multi-stage production Dockerfiles for all three applications (`api/Dockerfile`, `ngapp/Dockerfile`, `nxapp/Dockerfile`) orchestrated via `docker-compose.yml`.
"# Full-Stack-Web-Application" 
