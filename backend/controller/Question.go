package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /Question
func CreateQuestion(c *gin.Context) {
	var question		entity.Question
	var admin			entity.Admin

	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", question.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	qus := entity.Question{
		Title:			question.Title,
		Detail:			question.Detail,
		Reply:			question.Reply,
		Admin: 			admin,
	}

	if err := entity.DB().Create(&qus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": qus})
}

// GET /Question/:id
func GetQuestion(c *gin.Context) {
	var question entity.Question
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Where("id = ?", id).First(&question); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Question not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": question})
}

// GET /Questions
func ListQuestions(c *gin.Context) {
	var questions []entity.Question
	if err := entity.DB().Preload("Admin").Raw("SELECT * FROM questions").Find(&questions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": questions})
}

// DELETE /Question/:id
func DeleteQuestion(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM questions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Question not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Question
func UpdateQuestion(c *gin.Context) {
	var question		entity.Question
	var admin			entity.Admin

	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", question.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	update := entity.Question{
		Title:			question.Title,
		Detail:			question.Detail,
		Reply:			question.Reply,
		Admin: 			admin,
	}

	if err := entity.DB().Where("id = ?", question.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}