package entity

import (
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	dsn := "user=postgres dbname=TMS sslmode=disable password=123456"
    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

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
		// Main Entity
		&Gender{},
		&Course{},
		&CourseRegistration{},
		&PaymentStatus{},
		&Question{},
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
		Image:	   "https://i.pinimg.com/1200x/c1/65/d3/c165d3d14ba35071138320298a701956.jpg",
	}
	db.Model(&Member{}).Create(&MemberA)

	CourseA := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    10100,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseA)

	CourseB := Course{
		Name:     "ชีวอนามัยและความปลอดภัย",
		Detail:   "ทดสอบๆ",
		Price:    2000,
		Image:    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseB)

	CourseC := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    3000,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseC)

	CourseD := Course{
		Name:     "ทดสอบครับทดสอบบบบ",
		Detail:   "ทดสอบๆ",
		Price:    5000,
		Image:    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseD)

	CourseE := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "test test test",
		Price:    9000,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseE)

	CourseF := Course{
		Name:     "course testๆ",
		Detail:   "ทดสอบๆ",
		Price:    3000,
		Image:    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseF)

	CourseG := Course{
		Name:     "course testๆ 22",
		Detail:   "test test test",
		Price:    6000,
		Image:    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
		Admin:	  AdminA,
	}
	db.Model(&Course{}).Create(&CourseG)

	

	PaymentStatusA := PaymentStatus{
		Status: "รอการตรวจสอบ",
	}
	db.Model(&PaymentStatus{}).Create(&PaymentStatusA)

	PaymentStatusB := PaymentStatus{
		Status: "ผ่านการตรวจสอบ",
	}
	db.Model(&PaymentStatus{}).Create(&PaymentStatusB)

	PaymentStatusC := PaymentStatus{
		Status: "จำนวนเงินไม่ถูกต้อง",
	}
	db.Model(&PaymentStatus{}).Create(&PaymentStatusC)

	CourseRegistrationA := CourseRegistration{
		Receipt: "https://img.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg?w=2000",
		Member:  MemberA,
		Course:  CourseA,
		PaymentStatus: PaymentStatusA,
	}
	db.Model(&CourseRegistration{}).Create(&CourseRegistrationA)

	QuestionA := Question{
		Title:  "จ่ายเงินอย่างไร",
		Detail: "ถ้าคุณสงสัยนี่ดูนี่เลย",
		Reply:	"กดปุ่มชำระเงิน",
		Admin: AdminA,
	}
	db.Model(&Question{}).Create(&QuestionA)

	QuestionB := Question{
		Title:  "ต้องการติดต่อพูดคุยทำได้ตรงไหน",
		Detail: "คุณสงสัยว่าอยากคุยทำอย่างไรงั้นเหรอ",
		Reply: 	"Add Line มาสิ!!",
		Admin: AdminA,
	}
	db.Model(&Question{}).Create(&QuestionB)

	NewsA := News{
		Image:  "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsA)

	NewsB := News{
		Image:  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsB)

	NewsC := News{
		Image:  "https://plus.unsplash.com/premium_photo-1677215210940-99dc9abd546b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsC)

}
