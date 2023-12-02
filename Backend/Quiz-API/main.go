package main

import (
	highScore "example/QuizApi/pkg/highscore"
	"example/QuizApi/pkg/quiz"
	"net/http"

	"github.com/gin-gonic/gin"
)


func main() {	
	router := gin.Default();
	// Create REST API's
	// Enable CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})


	// API for QUIZ data
	router.GET("/quiz", quiz.GetQuiz)
	
	// API to retrieve highscore
	router.GET("/highScore", highScore.GetHighScores)

	// API to save score in "DB"
	router.POST("/highScore", highScore.SaveScore)

	router.Run("localhost: 9090")
}