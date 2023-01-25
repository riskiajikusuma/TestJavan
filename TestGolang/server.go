package main

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/riskiajikusuma/TestJavan/TestGolang/configs"
	"github.com/riskiajikusuma/TestJavan/TestGolang/routes"
	"gorm.io/gorm"
)

var (
	db     *gorm.DB      = configs.SetupDatabaseConnection(".env")
	router routes.Router = routes.NewRouter()
)

func main() {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		panic("error loading .env file")
	}

	mysqlDB, err := db.DB()
	if err != nil {
		panic("error in fetching mysql DB from gorm DB")
	}

	maxOpenConn, err := strconv.Atoi(os.Getenv("DB_MAX_OPEN_CONN"))
	if err != nil {
		log.Println(err)
		panic("Error converting DB_MAX_OPEN_CONN to int")
	}

	maxIdleConn, err := strconv.Atoi(os.Getenv("DB_MAX_IDLE_CONN"))
	if err != nil {
		log.Println(err)
		panic("Error converting DB_MAX_IDLE_CONN to int")
	}

	conMaxLifeTime, err := time.ParseDuration(os.Getenv("DB_CONN_MAX_LIFE_TIME"))
	if err != nil {
		log.Println(err)
		panic("Error converting DB_CONN_MAX_LIFE_TIME to time duration")
	}

	mysqlDB.SetMaxOpenConns(maxOpenConn)
	mysqlDB.SetMaxIdleConns(maxIdleConn)
	mysqlDB.SetConnMaxLifetime(conMaxLifeTime)

	app := gin.Default()

	// Initialize Routes
	router.SetupRouter(app, db)

	// Start and run the server
	err = app.Run("0.0.0.0:" + os.Getenv("APP_PORT"))
	if err != nil {
		panic("error when trying to run app")
	}
}
