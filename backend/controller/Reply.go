package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /Reply
func CreateReply(c *gin.Context) {
	var reply			entity.Reply
	var employee		entity.Employee
	var question		entity.Question

	if err := c.ShouldBindJSON(&reply); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reply.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", reply.QuestionID).First(&question); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Question not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rep := entity.Reply{
		Title:			reply.Title,
		Detail:			reply.Detail,
		Employee: 		employee,
		Question:		question,
	}

	if err := entity.DB().Create(&rep).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rep})
}

// GET /Reply/:id
func GetReply(c *gin.Context) {
	var reply entity.Reply
	id := c.Param("id")

	if tx := entity.DB().Preload("Employee").Preload("Question").Where("id = ?", id).First(&reply); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reply not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reply})
}

// GET /Replies
func ListReplies(c *gin.Context) {
	var replies []entity.Reply
	if err := entity.DB().Preload("Employee").Preload("Question").Raw("SELECT * FROM replies").Find(&replies).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": replies})
}

// DELETE /Reply/:id
func DeleteReply(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM replies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reply not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Reply
func UpdateReply(c *gin.Context) {
	var reply			entity.Reply
	var employee		entity.Employee
	var question		entity.Question

	if err := c.ShouldBindJSON(&reply); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reply.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", reply.QuestionID).First(&question); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Question not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	update := entity.Reply{
		Title:			reply.Title,
		Detail:			reply.Detail,
		Employee: 		employee,
		Question:		question,
	}

	if err := entity.DB().Where("id = ?", reply.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}