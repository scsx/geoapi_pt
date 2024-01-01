import React from 'react'

import {
  Fa0,
  Fa1,
  Fa2,
  Fa3,
  Fa4,
  Fa5,
  Fa6,
  Fa7,
  Fa8,
  Fa9
} from 'react-icons/fa6'

const PrettyNumber = (props) => {
  let number = props.number

  if (typeof number === 'number') {
    number = number.toString()
  }

  const arrOfDigits = Array.from(number)
  // Store all components in array.
  const faNumbers = [Fa0, Fa1, Fa2, Fa3, Fa4, Fa5, Fa6, Fa7, Fa8, Fa9]
  // Function to retrieve component.
  const getComp = (Comp) => <Comp></Comp>

  return (
    <span className={`prettynumber ${props.cssclass}`}>
      {arrOfDigits.map((digit, index) => {
        return <span key={`key--${index}`}>{getComp(faNumbers[digit])}</span>
      })}
    </span>
  )
}

export default PrettyNumber
