package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ShadderWK/Training-Management-System-FinalProject/entity"
)

// POST /Course
func CreateCourse(c *gin.Context) {

	var course entity.Course
	var admin entity.Admin
	var coursestatus entity.CourseStatus

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", course.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", course.CourseStatusID).First(&coursestatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseStatus not found"})
		return
	}

	cou := entity.Course{
		Detail:			course.Detail,
		Name:          	course.Name,
		Image:			course.Image,
		Price:			course.Price,
		Admin:			admin,
		Pdf:			course.Pdf,
		CourseStatus:	coursestatus,
		Place:			course.Place,
		StartTime:		course.StartTime,
		EndTime:		course.EndTime,
	}

	if err := entity.DB().Create(&cou).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": cou})
}

// GET /Course/:id
func GetCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Preload("CourseStatus").Where("id = ?", id).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course})
}

// GET /Courses
func ListCourses(c *gin.Context) {
	var courses []entity.Course
	if err := entity.DB().Preload("Admin").Preload("CourseStatus").Raw("SELECT * FROM courses").Find(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

// GET /CourseByCourseStatusID
func ListCoursesByCourseStatusID(c *gin.Context) {
	var courses []entity.Course

	statusID := c.Param("status_id")

	if tx := entity.DB().Preload("Admin").Preload("CourseStatus").Raw("SELECT * FROM courses WHERE course_status_id = ?", statusID).Find(&courses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

// GET /CountCoursesByCourseStatus
func CountCoursesByCourseStatus(c *gin.Context) {
	statusID := c.Param("status_id")

	var totalCount int64

	err := entity.DB().Table("courses").
		Where("course_status_id = ?", statusID).
		Count(&totalCount).
		Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalCount": totalCount})
}

// DELETE /Course/:id
func DeleteCourse(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM courses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Course
func UpdateCourse(c *gin.Context) {
	var course entity.Course
	var admin entity.Admin
	var coursestatus entity.CourseStatus

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", course.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", course.CourseStatusID).First(&coursestatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CourseStatus not found"})
		return
	}

	update := entity.Course{
		Detail:			course.Detail,
		Name:          	course.Name,
		Image:			course.Image,
		Price:			course.Price,
		Admin:			admin,
		Pdf:			course.Pdf,
		CourseStatus:	coursestatus,
		Place:			course.Place,
		StartTime:		course.StartTime,
		EndTime:		course.EndTime,
	}

	if err := entity.DB().Where("id = ?", course.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}