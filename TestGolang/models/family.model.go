package models

import (
	"time"

	"gorm.io/gorm"
)

type Family struct {
	Id              uint           `gorm:"primaryKey,autoIncrement" json:"id"`
	Kepala_keluarga string         `gorm:"not null" json:"kepala_keluarga"`
	Person          []*Person      `json:"anggota_keluarga"`
	Asset           []*Asset       `gorm:"many2many:family_assets"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"null" json:"deleted_at"`
}

func (Family) TableName() string {
	return "families"
}
