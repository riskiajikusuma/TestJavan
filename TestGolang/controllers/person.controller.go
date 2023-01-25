package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riskiajikusuma/TestJavan/TestGolang/helper"
	"github.com/riskiajikusuma/TestJavan/TestGolang/models"
	"gorm.io/gorm"
)

type PersonController interface {
	GetAllPeople(c *gin.Context)
	GetPerson(c *gin.Context)
	CreatePerson(c *gin.Context)
	UpdatePerson(c *gin.Context)
	DeletePerson(c *gin.Context)
}

type personController struct {
	db *gorm.DB
}

func NewPersonController(db *gorm.DB) PersonController {
	personController := &personController{
		db: db,
	}

	return personController
}

func (c *personController) GetAllPeople(ctx *gin.Context) {
	var person []models.Person

	c.db.Preload("Family").Find(&person)
	response := helper.BuildResponse(200, "Managed to retrieve data", &person)
	ctx.JSON(http.StatusOK, response)
}

func (c *personController) GetPerson(ctx *gin.Context) {
	var person models.Person
	id := ctx.Param("id")

	if err := c.db.Preload("Family").Preload("Asset").First(&person, id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	ctx.JSON(http.StatusOK, helper.BuildResponse(200, "Managed to retrieve data", &person))
}

type PersonRequest struct {
	Nama          string `json:"nama"`
	Jenis_kelamin string `json:"jenis_kelamin"`
	Family_id     uint   `json:"family_id"`
}

func (c *personController) CreatePerson(ctx *gin.Context) {
	var body PersonRequest

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	person := models.Person{
		Nama:          body.Nama,
		Jenis_kelamin: body.Jenis_kelamin,
		Family_id:     body.Family_id,
	}

	c.db.Create(&person)
	response := helper.StatusMessageResponse(200, "Managed to create data")
	ctx.JSON(http.StatusOK, response)
}

func (c *personController) UpdatePerson(ctx *gin.Context) {
	var body PersonRequest
	id := ctx.Param("id")

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	person := models.Person{
		Nama:          body.Nama,
		Jenis_kelamin: body.Jenis_kelamin,
		Family_id:     body.Family_id,
	}

	if c.db.Model(&person).Where("id = ?", id).Updates(&person).RowsAffected == 0 {
		response := helper.StatusMessageResponse(400, "Person data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.StatusMessageResponse(200, "Managed to update data")
	ctx.JSON(http.StatusOK, response)
}

func (c *personController) DeletePerson(ctx *gin.Context) {
	var person models.Person
	id := ctx.Param("id")

	if err := c.db.Where("id = ?", id).First(&person).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Person data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	c.db.Delete(&person)
	response := helper.StatusMessageResponse(200, "Managed to delete data")
	ctx.JSON(http.StatusOK, response)
}
