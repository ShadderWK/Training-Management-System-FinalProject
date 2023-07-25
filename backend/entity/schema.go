package entity

import (

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name 		string
	Password	string
}

type Member struct {
	gorm.Model
	Name 		string
	Email		string
	Password	string
}