package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/riskiajikusuma/TestJavan/TestGolang/controllers"
	"gorm.io/gorm"
)

type Router interface {
	SetupRouter(router *gin.Engine, db *gorm.DB)
}

type router struct{}

func NewRouter() Router {
	return &router{}
}

func (r *router) SetupRouter(router *gin.Engine, db *gorm.DB) {

	var (
		familyController      controllers.FamilyController      = controllers.NewFamilyController(db)
		personController      controllers.PersonController      = controllers.NewPersonController(db)
		assetController       controllers.AssetController       = controllers.NewAssetController(db)
		familyAssetController controllers.FamilyAssetController = controllers.NewFamilyAssetController(db)
		personAssetController controllers.PersonAssetController = controllers.NewPersonAssetController(db)
	)
	// Load ENV from .env file
	err := godotenv.Load()
	if err != nil {
		panic("error loading .env file")
	}

	family := router.Group("/families")
	family.GET("/", familyController.GetAllFamilies)
	family.GET("/:id", familyController.GetFamily)
	family.POST("/", familyController.CreateFamily)
	family.PUT("/:id", familyController.UpdateFamily)
	family.DELETE("/:id", familyController.DeleteFamily)

	person := router.Group("/people")
	person.GET("/", personController.GetAllPeople)
	person.GET("/:id", personController.GetPerson)
	person.POST("/", personController.CreatePerson)
	person.PUT("/:id", personController.UpdatePerson)
	person.DELETE("/:id", personController.DeletePerson)

	asset := router.Group("/assets")
	asset.GET("/", assetController.GetAllAssets)
	asset.GET("/:id", assetController.GetAsset)
	asset.POST("/", assetController.CreateAsset)
	asset.PUT("/:id", assetController.UpdateAsset)
	asset.DELETE("/:id", assetController.DeleteAsset)

	familyAsset := router.Group("/family-assets")
	familyAsset.POST("/:family_id/assets", familyAssetController.CreateFamilyAsset)
	familyAsset.DELETE("/:family_id/assets", familyAssetController.DeleteFamilyAsset)

	personAsset := router.Group("/person-assets")
	personAsset.POST("/:person_id/assets", personAssetController.CreatePersonAsset)
	personAsset.DELETE("/:person_id/assets", personAssetController.DeletePersonAsset)

}
