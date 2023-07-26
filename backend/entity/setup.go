package entity

import (

           "gorm.io/gorm"

           "gorm.io/driver/sqlite"

)
 
var db *gorm.DB

func DB() *gorm.DB {

           return db

}

func SetupDatabase() {

  database, err := gorm.Open(sqlite.Open("TMS.db"), &gorm.Config{})

  if err != nil {

        panic("failed to connect database")

  }

  // Migrate the schema

  database.AutoMigrate(
    // Actor
    &Admin{},
    &Member{},
    &Employee{},
    // Main Entity
    &Course{},
    &CourseRegistration{},
    &PaymentStatus{},
    &PaymentCheck {},
    &Question{},
    &Reply{},
    &News{},
  )

  db = database

}