import React, { useState } from 'react'
import QUESTIONS from "../assets/questions.js"
import quizCompletedImg from '../assets/quiz-complete.png'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length;

    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }

    if(quizIsCompleted){
        return(
            <div id='summary'>
                <img src={quizCompletedImg} alt="Trophy Icon" />
                <h2>Quiz Completed !</h2>
            </div>
        )
    }
    
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id='question'>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {
                        shuffledAnswers.map((answer,index) => {
                            return(<li key={index} className='answer'>
                                <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Quiz
