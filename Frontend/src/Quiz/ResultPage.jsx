import { useEffect, useState } from 'react';
import './Result.css';


const HighScoreItem = ({ name, score }) => {
    return (
      <div className="high-score-item">
        <span className="name">{name}</span>
        <span className="score">{score}</span>
      </div>
    );
  };



const ResultPage = ({userAnswers, resetQuiz, name, score}) => {
  const [highscores, setHighscores] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:9090/highScore")
    .then(r => r.json())
    .then(j => setHighscores(j[0].highscores));
  }, [saving]);

  const saveScore = async () => {
    setSaved(false);
    setSaving(true);
    await fetch('http://localhost:9090/highScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name.length ? name : "Anonymus",
        "score": score
      }),
    }).then(r=> {setSaved(true); setSaving(false)});
  }

  return(
    <div>
        <h2>Quiz Results: {score} of {userAnswers.length}</h2>
        <div className="high-score-display">
            <div className="high-score-list">
                <h2>Top High Scores</h2>
                {highscores.length ? highscores?.map((item, index) => (
                    <HighScoreItem key={index} name={item.name} score={item.score} />
                ))
            :
            <p>No Highscores</p>
            }
            </div>
        </div>
        <button className="try-again-button" onClick={resetQuiz}>
          Try Again
        </button>
        <button className="save-score-button" disabled={saved} onClick={saveScore}>
          Save Score
        </button>
    </div>
  );
}



export default ResultPage;