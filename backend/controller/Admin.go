package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// GET /Admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM admins WHERE id = ?", id).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /Admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin

	if err := entity.DB().Raw("SELECT * FROM admins").Scan(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admins})
}