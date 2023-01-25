# Test Javan - NodeJs

## Main Tech Stack

1. [NodeJs](https://nodejs.org) -> Programming Language
2. [Fastify](https://fastify.io) -> Backend framework
3. [Sequelize](https://sequelize.org) -> ORM

## Manual Installation

1. Setting `.env` file

   ```sh
   cp .env.example .env
   ```

   ```sh
   `APPLICATION CONFIG`
   APP_PORT={'PORT'}
   APP_LOG={'SHOW-LOG'} `true` or `false`

   `DATABASE CONFIG`
   DB_HOST={'DATABASE-HOSTNAME'}
   DB_NAME={'DATABASE-NAME'}
   DB_USERNAME={'DATABASE-USERNAME'}
   DB_PASSWORD={'DATABASE-PASSWORD'}
   DB_ROOT_PASSWORD={'DATABASE-ROOT-PASSWORD'}
   DB_MAX_POOL={'DATABASE-MAX-POOL'}
   DB_MIN_POOL={'DATABASE-MIN-POOL'}
   DB_IDLE_TIME={'DATABASE-IDLE-TIME'}
   DB_ACQUIRE_TIME={'DATABASE-ACQUIRE-TIME'}
   DB_LOG={'SHOW-DATABASE-LOG'} `true` or `false`
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Run migrations

   ```sh
   npm run migrate
   ```

4. Run seeders

   ```sh
   npm run seed:all
   ```

5. Run app

   ```sh
   npm start
   ```

6. Open browser to see API documentation with swagger
   http://host:port/documentation

## Docker Installation

1. Setting `.env`

   ```sh
   cp .env.example .env
   ```

2. Run docker command

   ```sh
   docker compose up -d
   ```

3. Open browser to see API documentation
   http://host:port/documentation
