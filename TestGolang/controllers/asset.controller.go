package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riskiajikusuma/TestJavan/TestGolang/helper"
	"github.com/riskiajikusuma/TestJavan/TestGolang/models"
	"gorm.io/gorm"
)

type AssetController interface {
	GetAllAssets(c *gin.Context)
	GetAsset(c *gin.Context)
	CreateAsset(c *gin.Context)
	UpdateAsset(c *gin.Context)
	DeleteAsset(c *gin.Context)
}

type assetController struct {
	db *gorm.DB
}

func NewAssetController(db *gorm.DB) AssetController {
	assetController := &assetController{
		db: db,
	}

	return assetController
}

func (c *assetController) GetAllAssets(ctx *gin.Context) {
	var asset []models.Asset

	c.db.Find(&asset)
	response := helper.BuildResponse(200, "Managed to retrieve data", &asset)
	ctx.JSON(http.StatusOK, response)
}

func (c *assetController) GetAsset(ctx *gin.Context) {
	var asset models.Asset
	id := ctx.Param("id")

	if err := c.db.First(&asset, id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	ctx.JSON(http.StatusOK, helper.BuildResponse(200, "Managed to retrieve data", &asset))
}

type AssetRequest struct {
	Asset string `json:"asset"`
	Harga int    `json:"harga"`
}

func (c *assetController) CreateAsset(ctx *gin.Context) {
	var body AssetRequest

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	asset := models.Asset{
		Asset: body.Asset,
		Harga: body.Harga,
	}

	c.db.Create(&asset)
	response := helper.StatusMessageResponse(200, "Managed to create data")
	ctx.JSON(http.StatusOK, response)
}

func (c *assetController) UpdateAsset(ctx *gin.Context) {
	var body AssetRequest
	id := ctx.Param("id")

	if err := ctx.ShouldBindJSON(&body); err != nil {
		response := helper.StatusMessageResponse(400, err.Error())
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	asset := models.Asset{
		Asset: body.Asset,
		Harga: body.Harga,
	}

	if c.db.Model(&asset).Where("id = ?", id).Updates(&asset).RowsAffected == 0 {
		response := helper.StatusMessageResponse(400, "Asset data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.StatusMessageResponse(200, "Managed to update data")
	ctx.JSON(http.StatusOK, response)
}

func (c *assetController) DeleteAsset(ctx *gin.Context) {
	var asset models.Asset
	id := ctx.Param("id")

	if err := c.db.Where("id = ?", id).First(&asset).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Asset data not found!")
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	c.db.Delete(&asset)
	response := helper.StatusMessageResponse(200, "Managed to delete data")
	ctx.JSON(http.StatusOK, response)
}
