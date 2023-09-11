package entity

import (
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("backup.db"), &gorm.Config{})

	fmt.Print(database)

	if err != nil {
		// fmt.Print(err)
		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		// Actor
		&Admin{},
		&Member{},
		&Employee{},
		// Main Entity
		&Gender{},
		&Course{},
		&CourseRegistration{},
		&PaymentStatus{},
		&PaymentCheck{},
		&Question{},
		&Reply{},
		&News{},
	)

	db = database

	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	AdminA := Admin{
		Email:    "Admin01@example.com",
		Name:     "ผู้ดูแล01",
		Password: string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)

	GenderA := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&GenderA)

	GenderB := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&GenderB)

	GenderC := Gender{
		Name: "ไม่ระบุ",
	}
	db.Model(&Gender{}).Create(&GenderC)

	BirthdayA := time.Date(2017, time.November, 4, 9, 15, 0, 0, time.UTC)

	MemberA := Member{
		Email:     "Member01@example.com",
		Firstname: "กันตพงศ์",
		Lastname:  "เดชาเกียรติไกร",
		Password:  string(passwordA),
		Tel:       "0871231212",
		Address:   "บ้านเลขที่ 69 ซอยถี่ๆ",
		Birthday:  BirthdayA,
		Gender:    GenderA,
	}
	db.Model(&Member{}).Create(&MemberA)

	EmployeeA := Employee{
		Email:    "Employee01@example.com",
		Name:     "พนักงาน01",
		Password: string(passwordA),
		Image:    "https://cdn-icons-png.flaticon.com/512/3789/3789820.png",
	}
	db.Model(&Employee{}).Create(&EmployeeA)

	CourseA := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseA)

	CourseB := Course{
		Name:     "ชีวอนามัยและความปลอดภัย",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseB)

	CourseC := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseC)

	CourseD := Course{
		Name:     "ทดสอบครับทดสอบบบบ",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseD)

	CourseE := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseE)

	CourseF := Course{
		Name:     "course testๆ",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseF)

	CourseG := Course{
		Name:     "course testๆ 22",
		Detail:   "test test test",
		Price:    1000,
		Image:    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
		Employee: EmployeeA,
	}
	db.Model(&Course{}).Create(&CourseG)

	CourseRegistrationA := CourseRegistration{
		Receipt: "https://img.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg?w=2000",
		Member:  MemberA,
		Course:  CourseA,
	}
	db.Model(&CourseRegistration{}).Create(&CourseRegistrationA)

	PaymentStatusA := PaymentStatus{
		Status: "จ่ายเงินแล้ว",
	}
	db.Model(&PaymentStatus{}).Create(&PaymentStatusA)

	PaymentCheckA := PaymentCheck{
		Comment:            "จ่ายเงินถูกต้อง",
		Employee:           EmployeeA,
		PaymentStatus:      PaymentStatusA,
		CourseRegistration: CourseRegistrationA,
	}
	db.Model(&PaymentCheck{}).Create(&PaymentCheckA)

	QuestionA := Question{
		Title:  "จ่ายเงินอย่างไร",
		Detail: "ผมสงสัยมากช่วยผมหน่อย",
		Member: MemberA,
	}
	db.Model(&Question{}).Create(&QuestionA)

	ReplyA := Reply{
		Title:    "จ่ายเงินแบบนี้",
		Detail:   "ต้องไปจ่ายในระบบจ่ายเงิน",
		Question: QuestionA,
		Employee: EmployeeA,
	}
	db.Model(&Reply{}).Create(&ReplyA)

	NewsA := News{
		Title:  "ฟังก์ชันใหม่",
		Detail: "ตอนนี้ทางเว็บเรามีฟังก์ชันใหม่แล้วนะครับ",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsA)

}
