import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const StyledTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    margin-bottom: -10px;
    padding-top: 30px;
    font-size: 3rem;
    text-transform: uppercase;
    color: #7067CF;
    font-weight: 500;
  }
  h3 {
    font-size: 7rem;
    color: #111D4A;
    font-weight: 400;
  }
`;

function Timer({ currentStatus, currentTime }) {
  const [status] = currentStatus
  const [time] = currentTime
  return (
    <StyledTimer>
      <h2>{status === 'session' ? 'Session' : 'Break'}</h2>
      <h3>{moment(time).format('mm:ss')}</h3>
    </StyledTimer>
  )
}

export default Timer