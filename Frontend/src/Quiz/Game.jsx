import {useState} from "react";
import './Game.css';

const AnswerOptions = 
	({
		question,
		setCorrectAnswers,
		setCurrentQuestion,
		currentQuestion,
		setUserAnswers,
		userAnswers,
		setStartGame,
		setShowResults,
		answers,
		correctAnswer,
		isLast,
		questionAmount
	}) =>
{

	const [optionClicked, setOptionClicked] = useState(false);

	const isCorrectOption = (op) => op === correctAnswer; 

	const handleOptionClick = (selectedOption) => {

		const isCorrect = selectedOption === correctAnswer;
		
		setOptionClicked(true);
		
		setTimeout(() => {
			setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedOption }]);

			if (isCorrect) {
				setCorrectAnswers();
			}	
			
			if (isLast) {
				setCurrentQuestion();
			} else {
				setStartGame(false);
				setShowResults(true);
			}
			
			setOptionClicked(false);
		}, 500)

	};

	return (
		<div>
			<h2>Quiz</h2>
			<p className="question">{question}</p>
			<ul>
				<div>
					{answers.map((option, index) => (
						<li
						key={index}
						style={{
							listStyleType: 'none'
						}}
					>
						<button
							disabled={optionClicked}
							className={`quiz-button ${optionClicked ? !isCorrectOption(option) && "incorrect" : ""}` }
							onClick={() => handleOptionClick(option)}
						>
								{option}
						</button>
					</li>
					))}
				</div>
			</ul>
			<p>{`${currentQuestion +1} of ${questionAmount}`}</p>
		</div>
	)
}

export default AnswerOptions;