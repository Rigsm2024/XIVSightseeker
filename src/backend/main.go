// backend/main.go
package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "backend/repository"
)

func main() {
    // ============
    // Setup Repository
    repos := repository.NewDBRepository()

    // ============
    // Setup GIN
    r := gin.Default()

    // Setup CORS
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "HEAD"},  
        AllowCredentials: true,                             
    }))

    // ping
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })

    // Sightseeing Logs
    r.GET("/SightseeingLogs", func(c *gin.Context) {
        logs, err := repos.LoadSightseeingLogs()
        if err != nil {
            c.JSON(500, "Failed to load data!")
            return
        }

        c.JSON(200, logs)
    })

    // [Sample]Raw Weather chances data
    r.GET("/RawWeatherChances", func(c *gin.Context) {
        chances, err := repos.LoadWeatherChances()
        if err != nil {
            c.JSON(500, "Failed to load data!")
            return
        }

        c.JSON(200, chances)
    })

    r.Run(":8080")
}
