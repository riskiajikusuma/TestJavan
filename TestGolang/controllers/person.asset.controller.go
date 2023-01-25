package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/riskiajikusuma/TestJavan/TestGolang/helper"
	"github.com/riskiajikusuma/TestJavan/TestGolang/models"
	"gorm.io/gorm"
)

type PersonAssetController interface {
	CreatePersonAsset(c *gin.Context)
	DeletePersonAsset(c *gin.Context)
}

type personAssetController struct {
	db *gorm.DB
}

func NewPersonAssetController(db *gorm.DB) PersonAssetController {
	personAssetController := &personAssetController{
		db: db,
	}

	return personAssetController
}

type PersonAssetRequest struct {
	Asset_id []uint `json:"asset_id"`
}

func (c *personAssetController) CreatePersonAsset(ctx *gin.Context) {
	var body PersonAssetRequest
	var person models.Person
	var personAsset []models.PersonAsset

	person_id := ctx.Param("person_id")
	num, _ := strconv.Atoi(person_id)

	if err := c.db.First(&person, person_id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Person data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	if err := ctx.ShouldBind(&body); err == nil {
		for _, asset_id := range body.Asset_id {
			data := models.PersonAsset{
				Person_id: uint(num),
				Asset_id:  asset_id,
			}
			personAsset = append(personAsset, data)
		}
	}

	c.db.Create(&personAsset)
	response := helper.StatusMessageResponse(200, "Managed to create data")
	ctx.JSON(http.StatusOK, response)
}

func (c *personAssetController) DeletePersonAsset(ctx *gin.Context) {
	var body PersonAssetRequest
	var person models.Person
	var personAsset []models.PersonAsset

	person_id := ctx.Param("person_id")
	num, _ := strconv.Atoi(person_id)

	if err := c.db.First(&person, person_id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Person data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	if err := ctx.ShouldBind(&body); err == nil {
		for _, asset_id := range body.Asset_id {
			c.db.Where("person_id = ?", uint(num)).Where("asset_id = ?", asset_id).Delete(&personAsset)
		}
	}

	response := helper.StatusMessageResponse(200, "Managed to delete data")
	ctx.JSON(http.StatusOK, response)
}
