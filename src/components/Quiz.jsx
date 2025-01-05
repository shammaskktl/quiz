import React, { act, useCallback, useRef, useState } from 'react'
import QUESTIONS from "../assets/questions.js"
import quizCompletedImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'

const Quiz = () => {
    const [answerState, setAnswerState] = useState("")
    const [userAnswers, setUserAnswers] = useState([])

    const shuffledAnswers = useRef()

    const activeQuestionIndex = answerState === "" ? userAnswers.length: userAnswers.length - 1;

    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState("answered")

        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState("correct")
            }else{
                setAnswerState("wrong")
            }

            setTimeout(() => {
                setAnswerState("")
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    )

    if(quizIsCompleted){
        return(
            <div id='summary'>
                <img src={quizCompletedImg} alt="Trophy Icon" />
                <h2>Quiz Completed !</h2>
            </div>
        )
    }

    if(!setUserAnswers.current) {
        shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5)
    }

    return (
        <div id="quiz">
            <div id='question'>
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {
                        shuffledAnswers.current.map((answer,index) => {
                            const isSelected = userAnswers[userAnswers.length - 1] === answer;
                            let cssClasses = "";

                            if(answerState === "answered" && isSelected){
                               cssClasses ="selected"; 
                            }else if((answerState === "correct" || answerState === "wrong") && isSelected){
                                cssClasses = answerState;
                            }

                            return(<li key={index} className='answer'>
                                <button 
                                onClick={() => handleSelectAnswer(answer)}
                                className={cssClasses}
                                >{answer}</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Quiz
