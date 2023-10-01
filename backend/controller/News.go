package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /News
func CreateNews(c *gin.Context) {
	var news 		entity.News
	var admin 		entity.Admin

	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", news.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	newsc := entity.News{
		Image:			news.Image,
		Admin: 			admin,
	}

	if err := entity.DB().Create(&newsc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": newsc})
}

// GET /News/:id
func GetNews(c *gin.Context) {
	var news entity.News
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Where("id = ?", id).First(&news); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "News not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}

// GET /News
func ListNews(c *gin.Context) {
	var news []entity.News
	if err := entity.DB().Preload("Admin").Raw("SELECT * FROM news").Find(&news).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}

// DELETE /News/:id
func DeleteNews(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM news WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "News not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /News
func UpdateNews(c *gin.Context) {
	var news 		entity.News
	var admin 		entity.Admin

	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", news.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	update := entity.News{
		Image:			news.Image,
		Admin: 			admin,
	}

	if err := entity.DB().Where("id = ?", news.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}