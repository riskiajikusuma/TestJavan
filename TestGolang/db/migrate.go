package main

import (
	"fmt"

	"github.com/riskiajikusuma/TestJavan/TestGolang/configs"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"gorm.io/gorm"
)

func main() {
	var komodoDb *gorm.DB = configs.SetupDatabaseConnection("../.env")

	sqlDB, err := komodoDb.DB()
	if err != nil {
		panic(fmt.Sprintf("error in fetching mysql DB from gorm DB: %v", err))
	}

	driver, err := mysql.WithInstance(sqlDB, &mysql.Config{})
	if err != nil {
		panic(fmt.Sprintf("error in fetching driver from sql DB: %v", err))
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"mysql", driver,
	)
	if err != nil {
		panic(fmt.Sprintf("failed to create migration instance: %v", err))
	}

	err = m.Up()
	fmt.Println(err)
	if err != nil {
		if err.Error() != "no change" {
			panic(fmt.Sprintf("failed to up the migration: %v", err))
		}
		fmt.Println("No change from previous migration")
	}

	fmt.Println("Migration process complete")
}
