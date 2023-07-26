package main

import (
	"os"
	"github.com/ShadderWK/Training-Management-System-FinalProject/controller"
  	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
  	"github.com/gin-gonic/gin"
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
	r.GET("/admin/:id", controller.GetAdmin)
	r.GET("/admins", controller.ListAdmins)

	//Employee
	r.POST("/employee", controller.CreateEmployee)
	r.GET("/employee/:id", controller.GetEmployee)
	r.GET("/employees", controller.ListEmployees)
	r.DELETE("/employee/:id", controller.DeleteEmployee)
	r.PATCH("/employee", controller.UpdateEmployee)

	//Member
	r.POST("/member", controller.CreateMember)
	r.GET("/member/:id", controller.GetMember)
	r.GET("/members", controller.ListMembers)
	r.DELETE("/member/:id", controller.DeleteMember)
	r.PATCH("/member", controller.UpdateMember)

	//PaymentStatus
	r.GET("/payment_status/:id", controller.GetPaymentStatus)
	r.GET("/payment_statuses", controller.ListPaymentStatuses)

	//Course
	r.POST("/course", controller.CreateCourse)
	r.GET("/course/:id", controller.GetCourse)
	r.GET("/courses", controller.ListCourses)
	r.DELETE("/course/:id", controller.DeleteCourse)
	r.PATCH("/course", controller.UpdateCourse)

	//CourseRegistration
	r.POST("/course_registration", controller.CreateCourseRegistration)
	r.GET("/course_registration/:id", controller.GetCourseRegistration)
	r.GET("/course_registrations", controller.ListCourseRegistrations)
	r.DELETE("/course_registration/:id", controller.DeleteCourseRegistration)
	r.PATCH("/course_registration", controller.UpdateCourseRegistration)

	//News
	r.POST("/news", controller.CreateNews)
	r.GET("/news/:id", controller.GetNews)
	r.GET("/news", controller.ListNews)
	r.DELETE("/news/:id", controller.DeleteNews)
	r.PATCH("/news", controller.UpdateNews)

	//PaymentCheck
	r.POST("/payment_check", controller.CreatePaymentCheck)
	r.GET("/payment_check/:id", controller.GetPaymentCheck)
	r.GET("/payment_checks", controller.ListPaymentChecks)
	r.DELETE("/payment_check/:id", controller.DeletePaymentCheck)
	r.PATCH("/payment_check", controller.UpdatePaymentCheck)

	//Question
	r.POST("/question", controller.CreateQuestion)
	r.GET("/question/:id", controller.GetQuestion)
	r.GET("/questions", controller.ListQuestions)
	r.DELETE("/question/:id", controller.DeleteQuestion)
	r.PATCH("/question", controller.UpdateQuestion)

	//Reply
	r.POST("/reply", controller.CreateReply)
	r.GET("/reply/:id", controller.GetReply)
	r.GET("/replies", controller.ListReplies)
	r.DELETE("/reply/:id", controller.DeleteReply)
	r.PATCH("/reply", controller.UpdateReply)

  	// Run the server
  	r.Run()

}