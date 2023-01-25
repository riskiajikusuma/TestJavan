package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riskiajikusuma/TestJavan/TestGolang/helper"
	"github.com/riskiajikusuma/TestJavan/TestGolang/models"
	"gorm.io/gorm"
)

type FamilyController interface {
	GetAllFamilies(c *gin.Context)
	GetFamily(c *gin.Context)
	CreateFamily(c *gin.Context)
	UpdateFamily(c *gin.Context)
	DeleteFamily(c *gin.Context)
}

type familyController struct {
	db *gorm.DB
}

func NewFamilyController(db *gorm.DB) FamilyController {
	familyController := &familyController{
		db: db,
	}

	return familyController
}

func (c *familyController) GetAllFamilies(ctx *gin.Context) {
	var families []models.Family

	c.db.Preload("Person").Find(&families)
	response := helper.BuildResponse(200, "Managed to retrieve data", &families)
	ctx.JSON(http.StatusOK, response)
}

func (c *familyController) GetFamily(ctx *gin.Context) {
	var family models.Family
	id := ctx.Param("id")

	if err := c.db.Preload("Person").First(&family, id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	ctx.JSON(http.StatusOK, helper.BuildResponse(200, "Managed to retrieve data", &family))
}

type FamilyRequest struct {
	Kepala_keluarga string `json:"kepala_keluarga"`
}

func (c *familyController) CreateFamily(ctx *gin.Context) {
	var body FamilyRequest

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	family := models.Family{
		Kepala_keluarga: body.Kepala_keluarga,
	}

	c.db.Create(&family)
	response := helper.StatusMessageResponse(200, "Managed to create data")
	ctx.JSON(http.StatusOK, response)
}

func (c *familyController) UpdateFamily(ctx *gin.Context) {
	var body FamilyRequest
	id := ctx.Param("id")

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	family := models.Family{
		Kepala_keluarga: body.Kepala_keluarga,
	}

	if err := c.db.Model(&family).Where("id = ?", id).Updates(&family).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Family data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.StatusMessageResponse(200, "Managed to update data")
	ctx.JSON(http.StatusOK, response)
}

func (c *familyController) DeleteFamily(ctx *gin.Context) {
	var family models.Family
	id := ctx.Param("id")

	if err := c.db.Where("id = ?", id).First(&family).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Family data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	c.db.Delete(&family)
	response := helper.StatusMessageResponse(200, "Managed to delete data")
	ctx.JSON(http.StatusOK, response)
}
