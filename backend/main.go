package main

import (
	"os"
	"github.com/ShadderWK/Training-Management-System-FinalProject/controller"
  	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
  	"github.com/gin-gonic/gin"

	Admin "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Admin"
	Course "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Course"
	CourseRegistration "github.com/ShadderWK/Training-Management-System-FinalProject/controller/CourseRegistration"
	Employee "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Employee"
	Member "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Member"
	News "github.com/ShadderWK/Training-Management-System-FinalProject/controller/News"
	PaymentCheck "github.com/ShadderWK/Training-Management-System-FinalProject/controller/PaymentCheck"
	PaymentStatus "github.com/ShadderWK/Training-Management-System-FinalProject/controller/PaymentStatus"
	Question "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Question"
	Reply "github.com/ShadderWK/Training-Management-System-FinalProject/controller/Reply"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
 
func main() {

	os.Remove("./TSM.db")
	entity.SetupDatabase()
  	r := gin.Default()

	r.Use(CORSMiddleware())

	//Admin
	r.GET("/admin/:id", Admin.GetAdmin)
	r.GET("/admins", Admin.ListAdmins)

	//Course
	r.POST("/course", Course.CreateCourse)
	r.GET("/course/:id", Course.GetCourse)
	r.GET("/courses", Course.ListCourses)
	r.DELETE("/course/:id", Course.DeleteCourse)
	r.PATCH("/course", Course.UpdateCourse)


  // Run the server

  r.Run()

}