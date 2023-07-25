package main

import (
	"os"
//   "github.com/ShadderWK/Training-Management-System-FinalProject/controller"
  	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
  	"github.com/gin-gonic/gin"
)

 

func main() {

	os.Remove("./TSM.db")
	entity.SetupDatabase()
  	r := gin.Default()

//   r.GET("/users", controller.ListUsers)

//   r.GET("/user/:id", controller.GetUser)

//   r.POST("/users", controller.CreateUser)

//   r.PATCH("/users", controller.UpdateUser)

//   r.DELETE("/users/:id", controller.DeleteUser)

 

  // Run the server

  r.Run()

}