package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /CourseRegistration
func CreateCourseRegistration(c *gin.Context) {
	var courseregistration 	entity.CourseRegistration
	var member 				entity.Member
	var course				entity.Course
	var paymentstatus		entity.PaymentStatus

	if err := c.ShouldBindJSON(&courseregistration); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.PaymentStatusID).First(&paymentstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStatus not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	coureg := entity.CourseRegistration{
		Receipt:		courseregistration.Receipt,
		Member:			member,
		Course: 		course,
		PaymentStatus:	paymentstatus,
	}

	if err := entity.DB().Create(&coureg).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": coureg})
}

// GET /CourseRegistration/:id
func GetCourseRegistration(c *gin.Context) {
	var courseregistration entity.CourseRegistration
	id := c.Param("id")

	if tx := entity.DB().Preload("Member").Preload("Course").Preload("PaymentStatus").Where("id = ?", id).First(&courseregistration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courseregistration})
}

// GET /CourseRegistrations
func ListCourseRegistrations(c *gin.Context) {
	var courseregistrations []entity.CourseRegistration
	if err := entity.DB().Preload("Member").Preload("Course").Preload("PaymentStatus").Raw("SELECT * FROM course_registrations").Find(&courseregistrations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courseregistrations})
}

// DELETE /CourseRegistration/:id
func DeleteCourseRegistration(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM course_registrations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /CourseRegistration
func UpdateCourseRegistration(c *gin.Context) {
	var courseregistration 	entity.CourseRegistration
	var member 				entity.Member
	var course				entity.Course
	var paymentstatus		entity.PaymentStatus

	if err := c.ShouldBindJSON(&courseregistration); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", courseregistration.PaymentStatusID).First(&paymentstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStatus not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	update := entity.CourseRegistration{
		Receipt:		courseregistration.Receipt,
		Member:			member,
		Course: 		course,
		PaymentStatus:	paymentstatus,
	}

	if err := entity.DB().Where("id = ?", courseregistration.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}