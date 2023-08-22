package entity

import (
	"gorm.io/gorm"

	"time"
)

type Admin struct {
	gorm.Model
	Email 		string
	Name		string
	Password	string

	News		[]News `gorm:"foreignKey:AdminID"`
}

type Gender struct {
	gorm.Model
	Name		string
}

type Member struct {
	gorm.Model
	Firstname 	string
	Lastname	string
	Email		string
	Password	string
	Image		string
	Birthday	time.Time

	GenderID 	int
	Gender		Gender

	CourseRegistration 	[]CourseRegistration	`gorm:"foreignKey:MemberID"`
	Question			[]Question   			`gorm:"foreignKey:MemberID"`	
}

type Employee struct {
	gorm.Model
	Name 		string
	Email		string
	Password	string
	Image		string

	Course			[]Course 		`gorm:"foreignKey:EmployeeID"`
	PaymentCheck 	[]PaymentCheck 	`gorm:"foreignKey:EmployeeID"`
	Reply 			[]Reply			`gorm:"foreignKey:EmployeeID"`
}

type Course struct {
	gorm.Model
	Name 		string
	Detail		string
	Price		int
	Image		string

	EmployeeID	*uint
	Employee	Employee

	CourseRegistration []CourseRegistration `gorm:"foreignKey:CourseID"`
}

type CourseRegistration struct {
	gorm.Model
	Receipt		string

	MemberID	*uint
	Member		Member

	CourseID	*uint
	Course		Course
}

type PaymentStatus struct {
	gorm.Model
	Status		string
}

type PaymentCheck struct {
	gorm.Model
	Comment					string

	EmployeeID				*uint
	Employee				Employee

	PaymentStatusID 		int
	PaymentStatus			PaymentStatus

	CourseRegistrationID	int
	CourseRegistration		CourseRegistration
}

type Question struct {
	gorm.Model
	Title		string
	Detail		string

	MemberID	*uint
	Member		Member
	
	Reply		[]Reply `gorm:"foreignKey:QuestionID"`
}

type Reply struct {
	gorm.Model
	Title		string
	Detail		string

	QuestionID	*uint
	Question	Question

	EmployeeID	*uint
	Employee	Employee
}

type News struct {
	gorm.Model
	Title		string
	Detail		string

	AdminID		*uint
	Admin		Admin
}