# UFO Park Workshop

This repository contains the UFO Park Workshop project, which includes multiple applications and libraries. This guide will help you set up the project locally and run the applications.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (>= 14.x)
- Yarn (>= 1.22.x)
- Docker
- Git

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine using Git.

```bash
git clone https://github.com/mohammadufo/ufo-park.git
cd ufo-park
```

### 2. Install Dependencies

Install the project dependencies using Yarn.

```
yarn install
```

### 3. Set Up Environment Variables

Copy `apps/api/.env.example` to `apps/api/.env` and fill it in. For the local Docker database, `DATABASE_URL` and `DIRECT_URL` can be the same URL.

### 4. Run the Database with Docker Compose

Start the PostgreSQL database using Docker Compose.

```
docker-compose up -d
```

### 5. Run Prisma Migrations

After the database is running, apply Prisma migrations to set up the database schema.

```
yarn prisma migrate dev
```

### 6. Run the Applications

You can run the individual applications using the following commands:

#### API Application

Navigate to the apps/api directory and start the API server.

```
cd apps/api
yarn start:dev
```

#### WEB Applications

Navigate to the apps/web directory and start the WEB server.

```
cd apps/web
yarn dev
```

## Deploying the API

The repo includes a Render Blueprint (`render.yaml`) for the API.

1. In Neon, copy two connection strings: the **pooled** one (host contains `-pooler`) and the **direct** one (without `-pooler`). Drop `&channel_binding=require`, add `&connect_timeout=15` to both, and add `&pgbouncer=true` to the pooled one.
2. In Render: **New → Blueprint**, pick this repo, and fill in the variables from `apps/api/.env.example` (`DATABASE_URL` = pooled, `DIRECT_URL` = direct).
3. The build runs `prisma migrate deploy`, so the tables are created on the first deploy.
4. Optional demo data: from your machine, with `DATABASE_URL` and `DIRECT_URL` pointing at Neon, run `cd apps/api && npx prisma db seed`.
5. In the Next.js apps, set `NEXT_PUBLIC_API_URL` to the Render URL and `NEXTAUTH_SECRET` to the same value as the API's `JWT_SECRET`.

## License

This project is licensed under the MIT License.
