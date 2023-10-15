package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex"`
	Name     string
	Password string

	News 		[]News 		`gorm:"foreignKey:AdminID"`
	Question 	[]Question 	`gorm:"foreignKey:AdminID"`
	Course      []Course    `gorm:"foreignKey:AdminID"`
}

type Gender struct {
	gorm.Model
	Name string
}

type Member struct {
	gorm.Model
	Firstname string
	Lastname  string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Tel       string
	Address   string
	Image  	  string
	Birthday  time.Time

	GenderID int
	Gender   Gender

	CourseRegistration []CourseRegistration `gorm:"foreignKey:MemberID"`
}

type Question struct {
	gorm.Model
	Title  string
	Detail string
	Reply  string

	AdminID *uint
	Admin   Admin
}

type News struct {
	gorm.Model
	Image  string

	AdminID *uint
	Admin   Admin
}

type PaymentStatus struct {
	gorm.Model
	Status string
}

type Course struct {
	gorm.Model
	Name   string
	Detail string
	Price  int
	Image  string

	AdminID *uint
	Admin   Admin

	CourseRegistration []CourseRegistration `gorm:"foreignKey:CourseID"`
}

type CourseRegistration struct {
	gorm.Model
	Receipt string

	MemberID *uint
	Member   Member

	CourseID *uint
	Course   Course

	PaymentStatusID int
	PaymentStatus PaymentStatus
}




