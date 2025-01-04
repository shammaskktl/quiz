import React from 'react'
import logoPic from '../assets/quiz-logo.png'

const Header = () => {
  return (
    <header>
      <img src={logoPic} alt="Logo Image" />
      <h1>React Quiz</h1>
    </header>
  )
}

export default Header
