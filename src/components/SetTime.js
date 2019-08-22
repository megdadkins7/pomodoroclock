import React from 'react'
import styled from 'styled-components'

const StyledSetTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-weight: 400;
    font-size: 1.5rem;
    color: #7067CF;
    margin-bottom: 1rem;
  }

  h3 {
    text-align: center;
    font-weight: 400;
    font-size: 2rem;
    color: #7067CF;
  }

  button {
    border: none;
    background-color: transparent;
    color: #7067CF;
    font-size: 2rem;
    font-weight: 700;
  }
`;

function SetTime({ type, value }) {
  const [val, setVal] = value
  
  const handleIncrement = () => {
    if (val >= 60) {
      return null
    } else {
        setVal(val + 1)
    }
  }
  const handleDecrement = () => {
    if (val === 1) {
      return null
    } else {
        setVal(val - 1)
    }
  }
  return (
    <StyledSetTime>
      <h2 id={`${type.toLowerCase()}-label`}>{type} Length</h2>
      <button id={`${type.toLowerCase()}-increment`} onClick={handleIncrement}>&uarr;</button>
      <h3 id={`${type.toLowerCase()}-length`}>{val}</h3>
      <button id={`${type.toLowerCase()}-decrement`} onClick={handleDecrement}>&darr;</button>
    </StyledSetTime>
  )
}

export default SetTime