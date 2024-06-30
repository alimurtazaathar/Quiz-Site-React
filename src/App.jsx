import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from "nanoid"
import MainPage from './components/MainPage'
import Quiz from "./components/Quiz"
import data from "./components/data"
export default function App() {

  const [displayMain, setDisplayMain] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(data.map(item => ({ id: item.id, option: "", })))
  const [submitted, setSubmitted] = useState(false)
  const quizQuestion = questions.map((question, index) => {return(
  <Quiz key={nanoid()} id={question.id} quizdata={question} selected={answers[index].option} changeAnswer={changeAnswer} submitted={submitted} />)})
  const [score, setScore] = useState(5);
  function changeAnswer(id, value) {
    if(submitted){return;}
    setAnswers((prevAnswers) => {
      console.log(id)
      return prevAnswers.map((answer) => answer.id === id ? { ...answer, option: value } : answer)
    })
  }
  function startQuiz() {
    if (questions.length > 0) {
      setDisplayMain(false);
    }
  }
  function resetQuiz() {
    setAnswers(data.map(item => ({ id: item.id, option: ""})))
    setSubmitted(false)
    setScore(5);
  }
  function submitAnswers(event) 
  {
    event.preventDefault();
    if (submitted) { resetQuiz(); return; }
    let allFilled = answers.every((answer) => answer.option != "")
    if (!allFilled)
    {
      alert("Please attempt all questions!");
      return;
    }
    questions.forEach((question, index) => 
    {
      //console.log(question.correctAnswer, answers[index].option)
      if (question.correctAnswer != answers[index].option)
      {
        console.log("here")
        setScore((prevScore) => prevScore - 1)
      }
    });
    setSubmitted(true);
  }
useEffect(() => {
  const Data = data;
  const questionsArray = data.map((item) => {
    let correct = item.correctAnswer;
    let incorrect = item.incorrectAnswers;
    const randomIndex = Math.floor(Math.random() * 4);
    const newArray = incorrect.toSpliced(Math.floor(Math.random() * 4), 0, correct);
    return {
      id: item.id,
      question: item.question.text,
      correctAnswer: correct,
      options: newArray,
    }
  })
  setQuestions(questionsArray);

}, [])

return (
  <>
    {displayMain ? <MainPage startQuiz={startQuiz} /> : quizQuestion}
    {!displayMain && <form onSubmit={submitAnswers}>{submitted && <h3 className="score">Your score is:{score}/5</h3>}<button type="submit" className="submit-btn" onClick={submitAnswers}>{submitted ? "Reset" : "Check Answers"}</button></form>}
  </>
)

}