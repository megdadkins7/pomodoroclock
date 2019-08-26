import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

import { useInterval } from '../hooks/useInterval'

import SetTime from './SetTime'
import Timer from './Timer'
import Controls from './Controls'

import alarm from '../sounds/alarm.mp3'

const StyledTimeApp = styled.div`
  header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header h1 {
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 5px;
    color: #111D4A;
  }
  main {
    width: 75vh;
  }
  .TimeWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .TimeDisplay {
    background-color: #F3F3F4;
    width: 400px;
    height: 400px;
    padding: 1rem;
    box-shadow: 0 3px 6px #888888;
    border-radius: 50%;
  }
  .SetTimeWrapper {
    margin: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (max-width: 600px) {
    main {
      width: 100%;
    }
  }
`;

function TimeApp() {
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [status, setStatus] = useState('session');
  const [time, setTime] = useState(sessionValue * 60 * 1000);
  const [active, setActive] = useState(false);
  const beep = useRef()

  useInterval(() => setTime(time - 1000), active ? 1000 : null)

  useEffect(() => {
    setTime(sessionValue * 60 * 1000)
  }, [sessionValue])
  
  useEffect(() => {
    if (time === 0 && status === 'session') {
      beep.current.play()
      setStatus('break')
      setTime(breakValue * 60 * 1000)
    } else if (time === 0 && status === 'break') {
      beep.current.play()
      setStatus('session')
      setTime(sessionValue * 60 * 1000)
    }
  }, [time, breakValue, sessionValue, status])

  const handleReset = () => {
    beep.current.pause()
    beep.current.currentTime = 0
    setActive(false)
    setStatus('session')
    setBreakValue(5)
    setSessionValue(25)
    setTime(25 * 60 * 1000)
  }

  return (
    <StyledTimeApp>
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <main>
        <div className='TimeWrapper'>
        <div className='TimeDisplay'>
          <Timer currentStatus={[status, setStatus]} currentTime={[time, setTime]} />
          <Controls
            activeState={[active, setActive]}
            handleReset={handleReset}
          />
        </div>
        </div>
        <div className='SetTimeWrapper'>
          <SetTime type={'Break'} value={[breakValue, setBreakValue]} />
          <SetTime type={'Session'} value={[sessionValue, setSessionValue]} />
        </div>
      </main>
      <audio id='beep' src={alarm} ref={beep} />
    </StyledTimeApp>
  )
}

export default TimeApp