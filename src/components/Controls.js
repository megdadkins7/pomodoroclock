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

function Controls({ activeStatus, handleReset }) {
  const [active, setActive] = activeStatus
  return (
    <StyledControls>
      <button id='StartStop' onClick={() => setActive(!active)}>
        {active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}
      </button>
      <button id='Reset' onClick={handleReset}>
        &#8635;
      </button>
    </StyledControls>
  )
}

export default Controls