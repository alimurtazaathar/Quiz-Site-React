import React from "react"
import { useState } from "react"
import { nanoid } from "nanoid"
export default function Quiz(props) {

  function setStyle(option)
  {
    if(props.submitted)
      {
          if(option===props.quizdata.correctAnswer)
            {
              return {backgroundColor:"#94D7A2",border:"none",opacity:"1"}
            }
          else if(props.selected===option)
          {
            return {backgroundColor:"#F8BCBC",border:"none"}
          }
          else
          {
            return {backgroundColor:"transparent"}
          }

      }
      else
      {
        return {backgroundColor:props.selected===option?"#D6DBF5":"transparent"}
      }
   

  }

  const optionsArray = props.quizdata.options.map((option) => {
    return (<div key={nanoid()}>
      <label htmlFor={`${option}-${props.id}`} className={props.submitted?"option-submitted":"option-"} style={setStyle(option)} >{option}</label>
      <input id={`${option}-${props.id}`} name="option" type="radio" value={option} onChange={(event)=>{
          const {value}=event.target;
          props.changeAnswer(props.id,value);
      }} />
    </div>
    )
  }
  )

  return (
    <div className="quiz-container">
      <h3 className="question">{props.quizdata.question}</h3>
      <div className="options">
        {optionsArray}
      </div>
      <hr />
    </div>)
}