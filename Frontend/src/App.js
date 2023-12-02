import './App.css';
import Quiz from "./Quiz/Quiz"
import {useEffect, useState} from "react";

function App() {

  const [quizData, setQuizData] = useState([]);

  useEffect(()=>{
      fetch("http://localhost:9090/quiz")
      .then(r => r.json())
      .then(j => setQuizData(j));
  }, []);

  return (
    <div className="App">
      <Quiz quizData={quizData}/>
    </div>
  );
}

export default App;
