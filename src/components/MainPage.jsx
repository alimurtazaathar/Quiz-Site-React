import react from "react"
export default function MainPage(props)
{
    return(
        <div className="main-container">
            <h2 className="heading">QuizMeUp</h2>
            <h3 className="description">You'll probably get it wrong.</h3>
            <button className="start-btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}