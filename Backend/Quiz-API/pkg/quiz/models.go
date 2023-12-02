package quiz

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type QuizResponse struct {
	ID					int			`json:"id"`
	Question			string		`json:"question"`
	PossibleAnswers		[]string	`json:"possibleAnswers"`
	CorrectAnswer		string		`json:"correctAnswer"`
}

func GetQuiz(c *gin.Context) {

	byteValue, err := os.ReadFile("questionsData.json")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch data from DB"})
		return
	}

	var quizQuestions []QuizResponse
	err = json.Unmarshal(byteValue, &quizQuestions)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":err})
		return
	}

	c.JSON(http.StatusOK, quizQuestions)
}