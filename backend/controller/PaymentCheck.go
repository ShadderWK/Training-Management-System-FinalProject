package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /PaymentCheck
func CreatePaymentCheck(c *gin.Context) {
	var paymentcheck			entity.PaymentCheck
	var employee				entity.Employee
	var paymentstatus			entity.PaymentStatus
	var courseregistration		entity.CourseRegistration

	if err := c.ShouldBindJSON(&paymentcheck); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.PaymentStatusID).First(&paymentstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.CourseRegistrationID).First(&courseregistration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	pc := entity.PaymentCheck{
		Comment:				paymentcheck.Comment,
		Employee: 				employee,
		PaymentStatus:			paymentstatus,
		CourseRegistration:		courseregistration,
	}

	if err := entity.DB().Create(&pc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": pc})
}

// GET /PaymentCheck/:id
func GetPaymentCheck(c *gin.Context) {
	var paymentcheck entity.PaymentCheck
	id := c.Param("id")

	if tx := entity.DB().Preload("Employee").Preload("PaymentStatus").Preload("CourseRegistration").Where("id = ?", id).First(&paymentcheck); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentCheck not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentcheck})
}

// GET /PaymentChecks
func ListPaymentChecks(c *gin.Context) {
	var paymentchecks []entity.PaymentCheck
	if err := entity.DB().Preload("Employee").Preload("PaymentStatus").Preload("CourseRegistration").Raw("SELECT * FROM payment_checks").Find(&paymentchecks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentchecks})
}

// DELETE /PaymentCheck/:id
func DeletePaymentCheck(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM payment_checks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentCheck not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /PaymentCheck
func UpdatePaymentCheck(c *gin.Context) {
	var paymentcheck			entity.PaymentCheck
	var employee				entity.Employee
	var paymentstatus			entity.PaymentStatus
	var courseregistration		entity.CourseRegistration

	if err := c.ShouldBindJSON(&paymentcheck); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.PaymentStatusID).First(&paymentstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentcheck.CourseRegistrationID).First(&courseregistration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseRegistration not found"})
		return
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	update := entity.PaymentCheck{
		Comment:				paymentcheck.Comment,
		Employee: 				employee,
		PaymentStatus:			paymentstatus,
		CourseRegistration:		courseregistration,
	}

	if err := entity.DB().Where("id = ?", paymentcheck.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}