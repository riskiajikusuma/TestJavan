# Test Javan - NodeJs

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/riskiajikusuma/TestJavan/tree/main/TestNodeJs
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setting `.env`

   ```sh
   cd .env.example .env
   ```

   ```
   `APPLICATION CONFIG`
   APP_PORT={'PORT'}
   APP_LOG={'SHOW-LOG'} `true` or `false`

   `DATABASE CONFIG`
   DB_HOST={'DATABASE-HOSTNAME'}
   DB_NAME={'DATABASE-NAME'}
   DB_USERNAME={'DATABASE-USERNAME'}
   DB_PASSWORD={'DATABASE-PASSWORD'}
   DB_MAX_POOL={'DATABASE-MAX-POOL'}
   DB_MIN_POOL={'DATABASE-MIN-POOL'}
   DB_IDLE_TIME={'DATABASE-IDLE-TIME'}
   DB_ACQUIRE_TIME={'DATABASE-ACQUIRE-TIME'}
   DB_LOG={'SHOW-DATABASE-LOG'} `true` or `false`
   ```

4. Run Application
   ```sh
   npm start
   ```
5. Open browser to see API documentation
   http://host:port/documentation
