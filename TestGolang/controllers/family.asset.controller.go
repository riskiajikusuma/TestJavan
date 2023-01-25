package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/riskiajikusuma/TestJavan/TestGolang/helper"
	"github.com/riskiajikusuma/TestJavan/TestGolang/models"
	"gorm.io/gorm"
)

type FamilyAssetController interface {
	CreateFamilyAsset(c *gin.Context)
	DeleteFamilyAsset(c *gin.Context)
}

type familyAssetController struct {
	db *gorm.DB
}

func NewFamilyAssetController(db *gorm.DB) FamilyAssetController {
	familyAssetController := &familyAssetController{
		db: db,
	}

	return familyAssetController
}

type FamilyAssetRequest struct {
	Asset_id []uint `json:"asset_id"`
}

func (c *familyAssetController) CreateFamilyAsset(ctx *gin.Context) {
	var body FamilyAssetRequest
	var family models.Family
	var familyAsset []models.FamilyAsset

	family_id := ctx.Param("family_id")
	num, _ := strconv.Atoi(family_id)

	if err := c.db.First(&family, family_id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Family data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	if err := ctx.ShouldBind(&body); err == nil {
		for _, asset_id := range body.Asset_id {
			data := models.FamilyAsset{
				Family_id: uint(num),
				Asset_id:  asset_id,
			}
			familyAsset = append(familyAsset, data)
		}
	}

	c.db.Create(&familyAsset)
	response := helper.StatusMessageResponse(200, "Managed to create data")
	ctx.JSON(http.StatusOK, response)
}

func (c *familyAssetController) DeleteFamilyAsset(ctx *gin.Context) {
	var body FamilyAssetRequest
	var family models.Family
	var familyAsset []models.FamilyAsset

	family_id := ctx.Param("family_id")
	num, _ := strconv.Atoi(family_id)

	if err := c.db.First(&family, family_id).Error; err != nil {
		response := helper.StatusMessageResponse(400, "Family data not found!")
		ctx.JSON(http.StatusBadRequest, response)

		return
	}

	if err := ctx.ShouldBind(&body); err == nil {
		for _, asset_id := range body.Asset_id {
			c.db.Where("family_id = ?", uint(num)).Where("asset_id = ?", asset_id).Delete(&familyAsset)
		}
	}

	response := helper.StatusMessageResponse(200, "Managed to delete data")
	ctx.JSON(http.StatusOK, response)
}
