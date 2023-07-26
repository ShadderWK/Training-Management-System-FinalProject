package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// GET /PaymentStatus/:id
func GetPaymentStatus(c *gin.Context) {
	var paymentstatus entity.PaymentStatus
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM payment_statuses WHERE id = ?", id).Scan(&paymentstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentstatus})
}

// GET /PaymentStatuses
func ListPaymentStatuses(c *gin.Context) {
	var paymentstatuses []entity.PaymentStatus

	if err := entity.DB().Raw("SELECT * FROM payment_statuses").Scan(&paymentstatuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentstatuses})
}