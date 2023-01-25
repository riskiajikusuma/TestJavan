package models

import (
	"time"

	"gorm.io/gorm"
)

type Asset struct {
	Id        uint           `gorm:"primaryKey,autoIncrement" json:"id"`
	Asset     string         `gorm:"not null" json:"asset"`
	Harga     int            `gorm:"not null" json:"harga"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"null" json:"deleted_at"`
}

type FamilyAsset struct {
	Family_id uint
	Asset_id  uint
}

type PersonAsset struct {
	Person_id uint
	Asset_id  uint
}

func (Asset) TableName() string {
	return "assets"
}
