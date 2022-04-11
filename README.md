# Store Front API
Udacity Full Stack Advanced Track #2 Project.

## Package Installation

Easy beasy, just run the following commands 👇

```sh
git clone https://github.com/AbdelrhmanSaid/store-front-api
cd store-front-api
npm install
```

Yeah, you did it 🌟.

## 📑 Create databases

- Create your database user, mine is api_client

```sh
CREATE USER USERNAME WITH PASSWORD 'PASSWORD';
```

- Create 2 Databases (production-ready database, and our test database), check out below 👇

```sh
CREATE DATABASE store;
CREATE DATABASE store_test;
```

- Don't forget to grant all privileges!

- Copy `.env.example` file to `.env`, and fill out required fields.

```sh
cp .env.example .env
```

## Used Ports
- Application: 3000
- Database: 5432

## 🧑‍💻 Scripts
Wonder how to use this application? Try to use this scripts out

### Build application

```sh
npm run build
```

### Serve Application

```sh
npm run dev
```

### Run tests

```sh
npm run test
```

### Linting

```sh
npm run lint
```

### Formating

```sh
npm run prettier
```

### Migrate & Rollback

- Migrate & Rollback `dev` environment

```sh
npm run migrate:dev
npm run rollback:dev
```

- Migrate & Rollback `test` environment

```sh
npm run migrate:test
npm run rollback:test
```