package highScore

import (
	"encoding/json"
	"net/http"
	"os"
	"sort"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Player struct {
	ID			string		`json:"id"`
	Name		string		`json:"name"`
	Score		int			`json:"score"`
}

type HighScore struct {
	HighScores	[]Player 	`json:"highscores"`
}

func GetHighScores(c *gin.Context){
	byteValue, err := os.ReadFile("highScoreData.json")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch data from DB"})
		return
	}

	var highScoreList []HighScore
	err = json.Unmarshal(byteValue, &highScoreList)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":err})
		return
	}

	// Sort HighScores by Score in descending order
	sort.Slice(highScoreList[0].HighScores, func(i, j int) bool {
		return highScoreList[0].HighScores[i].Score > highScoreList[0].HighScores[j].Score
	})

	// Take maximum 5 highscores
	if len(highScoreList[0].HighScores) > 5 {
		highScoreList[0].HighScores = highScoreList[0].HighScores[:5]
	}

	c.JSON(http.StatusOK, highScoreList)
}

func SaveScore(c *gin.Context) {
	var newPlayer Player

	newPlayer.ID = uuid.NewString()

	if err := c.BindJSON(&newPlayer); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":err})
		return
	}


	byteValue, err := os.ReadFile("highScoreData.json")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch data from DB"})
		return
	}

	var highScoreList []HighScore
	err = json.Unmarshal(byteValue, &highScoreList)


	highScoreList[0].HighScores = append(highScoreList[0].HighScores, newPlayer)

	// Write the modified data back to the file
	updatedData, err := json.MarshalIndent(highScoreList, "", "  ")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal data"})
		return
	}

	err = os.WriteFile("highScoreData.json", updatedData, 0644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write data to file"})
		return
	}

	c.JSON(http.StatusCreated, newPlayer);

}