package models

import (
	"time"

	"gorm.io/gorm"
)

type Person struct {
	Id            uint           `gorm:"primaryKey,autoIncrement" json:"id"`
	Nama          string         `gorm:"not null" json:"nama"`
	Jenis_kelamin string         `gorm:"not null" json:"jenis_kelamin"`
	Family_id     uint           `gorm:"references:id"`
	Family        *Family        `json:"keluarga"`
	Asset         []*Asset       `gorm:"many2many:person_assets"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"null" json:"deleted_at"`
}

func (Person) TableName() string {
	return "people"
}
