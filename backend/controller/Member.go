package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
	"github.com/gin-gonic/gin"
)

// POST /Member
func CreateMember(c *gin.Context) {

	var member entity.Member
	var gender entity.Gender

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	mem := entity.Member{
		Email:     member.Email,
		Password:  member.Password,
		Firstname: member.Firstname,
		Lastname:  member.Lastname,
		Tel:       member.Tel,
		Address:   member.Address,
		Gender:    gender,
		Birthday:  member.Birthday,
	}

	if err := entity.DB().Create(&mem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": mem})
}

// GET /Member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /Members
func ListMembers(c *gin.Context) {
	var members []entity.Member

	if err := entity.DB().Raw("SELECT * FROM members").Scan(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /Member/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Member
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var gender entity.Gender

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	update := entity.Member{
		Email:     member.Email,
		Password:  member.Password,
		Firstname: member.Firstname,
		Lastname:  member.Lastname,
		Tel:       member.Tel,
		Address:   member.Address,
		Gender:    gender,
		Birthday:  member.Birthday,
	}

	if err := entity.DB().Where("id = ?", member.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}
