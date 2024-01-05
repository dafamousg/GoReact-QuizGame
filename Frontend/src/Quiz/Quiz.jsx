import {useState} from "react";
import ResultPage from "./ResultPage";
import StartPage from "./Startpage";
import AnswerOptions from "./Game";

const Quiz = ({quizData}) => {    
    const [points, setPoints] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [name, setName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    if(!quizData.length) return;

    const answersArray = quizData[currentQuestion].possibleAnswers;

    
    const resetQuiz = () => {
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowResults(false);
      setPoints(0);
      setStartGame(true);
      setName('');
    };

    const shuffleAnswers = () => {
			return answersArray.sort(()=> Math.random() - 0.5);
	}

  return (
    <div>
      {showResults && (
        <ResultPage
          userAnswers={userAnswers}
          resetQuiz={resetQuiz}
          name={name}
          score={points}
          />
      )}
      {!startGame && !showResults && (
        <StartPage
          name={name}
          setName={setName}
          onClick={setStartGame}
          />
        )}
      {startGame && (
        <AnswerOptions
          question={quizData[currentQuestion].question}
          setCorrectAnswers={() => setPoints(points+1)}
          setCurrentQuestion={() => setCurrentQuestion(currentQuestion +1)}
          currentQuestion={currentQuestion}
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
          setStartGame={setStartGame}
          setShowResults={setShowResults}
          answers={shuffleAnswers() || []}
          correctAnswer={quizData[currentQuestion].correctAnswer}
          isLast={currentQuestion + 1 < quizData.length}
          questionAmount={quizData.length}
          />
        )}
    </div>
  );
}

export default Quiz;