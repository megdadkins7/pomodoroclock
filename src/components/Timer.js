import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const StyledTimer = styled.div``;

function Timer({ currentMode, currentTime}) {
  const [mode] = currentMode
  const [time] = currentTime
  return (
    <StyledTimer>
      <h2 id='TimerLabel'>{mode === 'session' ? 'Session' : 'Break'}</h2>
      <h3 id='TimeLeft'>{moment(time).format('mm:ss')}</h3>
    </StyledTimer>
  )
}

export default Timer