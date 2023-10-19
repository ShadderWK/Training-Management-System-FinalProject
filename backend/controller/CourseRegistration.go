package controller

import (
	"net/http"

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

// GET /CourseRegistrationsByPaymentStatusID
func ListCourseRegistrationsByMemberID(c *gin.Context) {
	var courseregistrations []entity.CourseRegistration
	memberID := c.Param("member_id")
	statusID := c.Param("status_id")

	if tx := entity.DB().Preload("Member").Preload("Course").Preload("PaymentStatus").Raw("SELECT * FROM course_registrations WHERE member_id = ? AND payment_status_id = ?", memberID, statusID).Find(&courseregistrations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courseregistrations})
}

// GET /CourseRegistrationsByCourseID
func ListCourseRegistrationsByCourseID(c *gin.Context) {
	var courseregistrations []entity.CourseRegistration
	courseID := c.Param("course_id")
	statusID := c.Param("status_id")

	if tx := entity.DB().Preload("Member").Preload("Course").Preload("PaymentStatus").Raw("SELECT * FROM course_registrations WHERE course_id = ?  AND payment_status_id = ?", courseID, statusID).Find(&courseregistrations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courseregistrations})
}

func GetCourseRegistrationsByCourseID(c *gin.Context) {
	var courseregistrations entity.CourseRegistration

	courseID := c.Param("course_id")
	statusID := c.Param("status_id")
	memberID := c.Param("member_id")

	if tx := entity.DB().Preload("Member").Preload("Course").Preload("PaymentStatus").Raw("SELECT * FROM course_registrations WHERE course_id = ?  AND payment_status_id = ? AND member_id = ?", courseID, statusID, memberID).Find(&courseregistrations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courseregistrations})
}

// GET /CountCourseRegistrationByPaymentStatus/:status_id
func CountCourseRegistrationByPaymentStatus(c *gin.Context) {
	statusID := c.Param("status_id")

	var totalCount int64
	err := entity.DB().Table("course_registrations").
		Where("payment_status_id = ?", statusID).
		Count(&totalCount).
		Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalCount": totalCount})
}

func SumCourseRegistrationPrices(c *gin.Context) {
    var total_price int64

	statusID := c.Param("status_id")

	if tx := entity.DB().Raw("SELECT SUM(courses.price) AS total_price FROM course_registrations JOIN courses ON course_registrations.course_id = courses.id WHERE course_registrations.payment_status_id = ?",statusID).Find(&total_price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": total_price})
}

func SumCourseRegistrationPricesByMemberID(c *gin.Context) {
    var total_price int64

	statusID := c.Param("status_id")
	memberID := c.Param("member_id")

	if tx := entity.DB().Raw("SELECT SUM(courses.price) AS total_price FROM course_registrations JOIN courses ON course_registrations.course_id = courses.id WHERE course_registrations.payment_status_id = ? AND course_registrations.member_id =  ?",statusID,memberID).Find(&total_price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": total_price})
}

func CountCoursesRegistraionByMemberID(c *gin.Context) {
	memberID := c.Param("member_id")

	var totalCount int64

	err := entity.DB().Table("course_registrations").
		Where("member_id = ?", memberID).
		Count(&totalCount).
		Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalCount": totalCount})
}

func CheckCourseRegistrationByCourseID(c *gin.Context) {
	var checkCourseReg string

	memberID := c.Param("member_id")
	courseID := c.Param("course_id")
	statusID := c.Param("status_id")

	if tx := entity.DB().Raw("SELECT CASE WHEN EXISTS (SELECT 1 FROM course_registrations WHERE member_id = ? AND course_id = ? AND payment_status_id = ?) THEN 'checked' ELSE 'not_checked' END AS is_registered", memberID, courseID, statusID).Find(&checkCourseReg); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"is_registered": checkCourseReg})
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