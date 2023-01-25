package configs

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func SetupDatabaseConnection(pathEnv string) *gorm.DB {
	err := godotenv.Load(pathEnv)
	fmt.Println(err)
	if err != nil {
		log.Println(err)
		panic("Error loading .env file")
	}

	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHostname := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUsername, dbPassword, dbHostname, dbName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Printf("error when connecting to database in config gorm.Open(mysql.Open(dsn), &gorm.Config{}): %v\n", err)
		panic("Failed connecting to database")
	} else {
		fmt.Println("Connected to database")
	}

	return db
}
