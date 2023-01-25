# Test Javan - Golang

## Main Tech Stack

1. [Golang](https://golang.org/) -> Programming Language
2. [Gin Gonic](https://github.com/gin-gonic) -> Backend framework
3. [Gorm](https://gorm.io/index.html) -> ORM

## Manual Installation

1. Setting `.env` file

   ```sh
   cp .env.example .env
   ```

   ```sh
   `APPLICATION`
    APP_PORT={'PORT'}

    `DATABASE`
    DB_HOST={'DATABASE-HOSTNAME'}
    DB_NAME={'DATABASE-NAME'}
    DB_USERNAME={'DATABASE-USERNAME'}
    DB_PASSWORD={'DATABASE-PASSWORD'}
    DB_ROOT_PASSWORD={'DATABASE-ROOT-PASSWORD'}
    DB_MAX_OPEN_CONN={'DATABASE-MAX-OPEN-CONN'}
    DB_MAX_IDLE_CONN={'DATABASE-MAX-IDLE-CONN'}
    DB_CONN_MAX_LIFE_TIME={'DATABASE-CONN-MAX-LIFE-TIME'}
   ```

2. Install Go modules

   ```sh
   go mod tidy
   ```

3. Run migrations

   ```sh
   cd db
   go run migrate.go
   ```

4. Run app

   ```sh
   go run server.go
   ```

## Docker Installation

1. Setting `.env`

   ```sh
   cp .env.example .env
   ```

2. Run docker command

   ```sh
   docker compose up -d
   ```
