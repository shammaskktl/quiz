import React, { useEffect, useState } from 'react'

const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        console.log("SETTING TIMEOUT");
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("SETTING TIMEOUT");
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100)

            return () => {
                clearInterval(interval)
            }
        }, 100)
    }, [])

    return (
        <progress id='question-time' value={remainingTime} max={timeout} />
    )
}

export default QuestionTimer
