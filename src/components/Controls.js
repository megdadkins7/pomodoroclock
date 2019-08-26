import React from 'react'
import styled from 'styled-components'

const StyledControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 3rem;
    border: none;
    background-color: transparent;
    color: #7067CF;
  }
`;

function Controls({ activeState, handleReset }) {
  const [active, setActive] = activeState
  return (
    <StyledControls>
      <button onClick={() => setActive(!active)}>
        {active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}
      </button>
      <button onClick={handleReset}>
        &#8635;
      </button>
    </StyledControls>
  )
}

export default Controls