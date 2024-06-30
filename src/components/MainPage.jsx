import react from "react"
export default function MainPage(props)
{
    return(
        <div className="main-container">
            <h2 className="heading">QuizMeUp</h2>
            <h3 className="description">How well do you know the world?</h3>
            <button className="start-btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}