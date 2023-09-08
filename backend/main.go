package main

import (
	"os"

	"github.com/ShadderWK/Training-Management-System-FinalProject/controller"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
	"github.com/ShadderWK/Training-Management-System-FinalProject/middlewares"
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

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			//Admin
			router.GET("/admin/:id", controller.GetAdmin)
			router.GET("/admins", controller.ListAdmins)

			//Employee
			router.GET("/employee/:id", controller.GetEmployee)
			router.GET("/employees", controller.ListEmployees)
			router.DELETE("/delete-employee/:id", controller.DeleteEmployee)
			router.PATCH("/update-employee", controller.UpdateEmployee)

			//Member
			router.GET("/member/:id", controller.GetMember)
			router.GET("/members", controller.ListMembers)
			router.DELETE("/delete-member/:id", controller.DeleteMember)
			router.PATCH("/update-member", controller.UpdateMember)

			//PaymentStatus
			router.GET("/payment_status/:id", controller.GetPaymentStatus)
			router.GET("/payment_statuses", controller.ListPaymentStatuses)

			//Gender
			router.GET("/gender/:id", controller.GetGender)
			router.GET("/genders", controller.ListGenders)

			//Course
			router.POST("/course", controller.CreateCourse)
			router.GET("/course/:id", controller.GetCourse)
			router.GET("/courses", controller.ListCourses)
			router.DELETE("/delete-course/:id", controller.DeleteCourse)
			router.PATCH("/update-course", controller.UpdateCourse)

			//CourseRegistration
			router.POST("/course_registration", controller.CreateCourseRegistration)
			router.GET("/course_registration/:id", controller.GetCourseRegistration)
			router.GET("/course_registrations", controller.ListCourseRegistrations)
			router.DELETE("/delete-course_registration/:id", controller.DeleteCourseRegistration)
			router.PATCH("/update-course_registration", controller.UpdateCourseRegistration)

			//News
			router.POST("/news", controller.CreateNews)
			router.GET("/news/:id", controller.GetNews)
			router.GET("/news", controller.ListNews)
			router.DELETE("/delete-news/:id", controller.DeleteNews)
			router.PATCH("/update-news", controller.UpdateNews)

			//PaymentCheck
			router.POST("/payment_check", controller.CreatePaymentCheck)
			router.GET("/payment_check/:id", controller.GetPaymentCheck)
			router.GET("/payment_checks", controller.ListPaymentChecks)
			router.DELETE("/delete-payment_check/:id", controller.DeletePaymentCheck)
			router.PATCH("/update-payment_check", controller.UpdatePaymentCheck)

			//Question
			router.POST("/question", controller.CreateQuestion)
			router.GET("/question/:id", controller.GetQuestion)
			router.GET("/questions", controller.ListQuestions)
			router.DELETE("/delete-question/:id", controller.DeleteQuestion)
			router.PATCH("/update-question", controller.UpdateQuestion)

			//Reply
			router.POST("/reply", controller.CreateReply)
			router.GET("/reply/:id", controller.GetReply)
			router.GET("/replies", controller.ListReplies)
			router.DELETE("/delete-reply/:id", controller.DeleteReply)
			router.PATCH("/update-reply", controller.UpdateReply)
		}
	}

	//Register
	r.POST("/employee", controller.CreateEmployee)
	r.POST("/member", controller.CreateMember)

	//Login
	r.POST("/memberLogin", controller.LoginMember)
	r.POST("/adminLogin", controller.LoginAdmin)
	r.POST("/employeeLogin", controller.LoginEmployee)

	// Run the server
	r.Run(":8080")

}
