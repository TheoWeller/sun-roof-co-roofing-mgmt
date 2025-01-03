# Sun Roof Co Server + Client

## Description

A project management system for Sun Roof Co, featuring a RESTful API server and web client application.

Backend Built with:

- Docker
- PostgreSQL
- Prisma
- NestJS
- Open API

Frontend Built with:

- Vite
- TypeScript React
- Mantine UI
- Valtio (State Management)

---

## Server setup

### Create environment file

Create a `.env` file in the root of the `/server` directory with the following contents:

```env
DB_USER=sun-roof-co-db-user
DB_PASSWORD=sunroof123secure
DB_NAME=sun-roof-co-db

DATABASE_URL="postgres://sun-roof-co-db-user:sunroof123secure@localhost:5432/sun-roof-co-db"
```

### Install dependencies

```bash
$ cd server
$ npm install
```

### Run docker compose

```bash
$ docker-compose up -d
```

### Run prisma migrations

```bash
$ npx prisma migrate dev --name "init"
```

### Generate Prisma Client

```bash
$ npx prisma generate
```

### Seed database

```bash
$ npm run prisma:seed
```

## Run Prisma Studio

```bash
$ npx prisma studio
```

### Compile and run the project

In a separate terminal, run:

```bash
$ ed server

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Client setup

In a separate terminal, run:

```bash
$ cd client
$ npm install
```

### Run the client

```bash
$ cd client
$ npm run dev

$ npx vite // http://localhost:3001/
```
