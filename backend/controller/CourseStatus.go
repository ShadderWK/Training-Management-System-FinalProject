package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// GET /CourseStatus/:id
func GetCourseStatus(c *gin.Context) {
	var coursestatus entity.CourseStatus
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM course_statuses WHERE id = ?", id).Scan(&coursestatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coursestatus})
}

// GET /courseStatuses
func ListCourseStatuses(c *gin.Context) {
	var coursestatuses []entity.PaymentStatus

	if err := entity.DB().Raw("SELECT * FROM course_statuses").Scan(&coursestatuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coursestatuses})
}