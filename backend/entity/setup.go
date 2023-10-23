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
		&CourseStatus{},
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
	StartTimeA := time.Date(2019, time.December, 5, 3, 0, 0, 0, time.UTC)
	EndTimeA := time.Date(2019, time.December, 5, 4, 0, 0, 0, time.UTC)

	MemberA := Member{
		Email:     "Member01@example.com",
		Firstname: "กันตพงศ์",
		Lastname:  "เดชาเกียรติไกร",
		Password:  string(passwordA),
		Tel:       "0871231212",
		Address:   "บ้านเลขที่ 69 ซอยหมู่บ้านๆ",
		Birthday:  BirthdayA,
		Gender:    GenderA,
		Image:	   "https://i.pinimg.com/1200x/c1/65/d3/c165d3d14ba35071138320298a701956.jpg",
	}
	db.Model(&Member{}).Create(&MemberA)

	MemberB := Member{
		Email:     "Member02@example.com",
		Firstname: "สมศรี",
		Lastname:  "หฤทัย",
		Password:  string(passwordA),
		Tel:       "0971242212",
		Address:   "บ้านเลขที่ 788 ซอยพิลม",
		Birthday:  BirthdayA,
		Gender:    GenderB,
		Image: 	   "https://i.pinimg.com/564x/70/9f/60/709f60999c513338e23c71591ceca743.jpg",
	}
	db.Model(&Member{}).Create(&MemberB)

	CourseStatusA := CourseStatus{
		Status: "เปิดใช้งาน",
	}
	db.Model(&CourseStatus{}).Create(&CourseStatusA)

	CourseStatusB := CourseStatus{
		Status: "ปิดใช้งาน",
	}
	db.Model(&CourseStatus{}).Create(&CourseStatusB)

	CourseA := Course{
		Name:     "แนวโน้มนวัตกรรมและเทคโนโลยีการศึกษาสำหรับการจัดการการศึกษาทุกช่วงวัย",
		Detail:   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		Price:    10100,
		Image:    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		Admin:	  AdminA,
		LinkContact:  "https://www.facebook.com/",
		QRContact: "https://www.smartlevels.com/QR/WebSite?op=getpreview&type=def",
		LinkFile: "https://www.africau.edu/images/default/sample.pdf",
		CourseStatus: CourseStatusA,
		Place:	  "ห้อง 1102",
		StartTime: StartTimeA,
		EndTime:   EndTimeA,
	}
	db.Model(&Course{}).Create(&CourseA)

	CourseB := Course{
		Name:     "Cybersecurity for Executives",
		Detail:   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		Price:    2000,
		Image:    "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
		LinkContact:  "https://www.facebook.com/",
		QRContact: "https://www.smartlevels.com/QR/WebSite?op=getpreview&type=def",
		LinkFile:	  "https://www.africau.edu/images/default/sample.pdf",
		CourseStatus: CourseStatusA,
		Place:	  "ห้อง 2102",
		StartTime: StartTimeA,
		EndTime:   EndTimeA,
	}
	db.Model(&Course{}).Create(&CourseB)

	CourseC := Course{
		Name:     "เทคนิคการเร่งรัดหนี้สินอย่างมืออาชีพ สำหรับลูกหนี้การค้า",
		Detail:   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		Price:    3000,
		Image:    "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
		LinkContact:  "https://www.facebook.com/",
		QRContact: "https://www.smartlevels.com/QR/WebSite?op=getpreview&type=def",
		LinkFile:	  "https://www.africau.edu/images/default/sample.pdf",
		CourseStatus: CourseStatusA,
		Place:	  "ออนไลน์",
		StartTime: StartTimeA,
		EndTime:   EndTimeA,
	}
	db.Model(&Course{}).Create(&CourseC)

	CourseD := Course{
		Name:     "Develop Digital Culture for Team Excellence พัฒนาวัฒนธรรมการสร้างทีมที่มีประสิทธิภาพ",
		Detail:   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		Price:    4500,
		Image:    "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
		LinkContact:  "https://www.facebook.com/",
		QRContact: "https://www.smartlevels.com/QR/WebSite?op=getpreview&type=def",
		LinkFile:	  "https://www.africau.edu/images/default/sample.pdf",
		CourseStatus: CourseStatusA,
		Place:	  "Zoom",
		StartTime: StartTimeA,
		EndTime:   EndTimeA,
	}
	db.Model(&Course{}).Create(&CourseD)

	CourseE := Course{
		Name:     "นักพากย์ Esports",
		Detail:   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		Price:    500,
		Image:    "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		Admin:	  AdminA,
		LinkContact:  "https://www.facebook.com/",
		QRContact: "https://www.smartlevels.com/QR/WebSite?op=getpreview&type=def",
		LinkFile:	  "https://www.africau.edu/images/default/sample.pdf",
		CourseStatus: CourseStatusA,
		Place:	  "Microsoft Team",
		StartTime: StartTimeA,
		EndTime:   EndTimeA,
	}
	db.Model(&Course{}).Create(&CourseE)

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
		Image:  "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsA)

	NewsB := News{
		Image:  "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsB)

	NewsC := News{
		Image:  "https://images.unsplash.com/photo-1636955840493-f43a02bfa064?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070",
		Admin:  AdminA,
	}
	db.Model(&News{}).Create(&NewsC)

}
