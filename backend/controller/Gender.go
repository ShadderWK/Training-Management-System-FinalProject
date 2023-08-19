package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// GET /Gender/:id
func GetGender(c *gin.Context) {
	var gender entity.Gender
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM genders WHERE id = ?", id).Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}

// GET /Gender
func ListGenders(c *gin.Context) {
	var genders []entity.Gender

	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}