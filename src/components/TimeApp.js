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
  const [breakVal, setBreakVal] = useState(5)
  const [sessionVal, setSessionVal] = useState(25)
  const [mode, setMode] = useState('session')
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [active, setActive] = useState(false)
  const beep = useRef()
  
  useInterval(() => setTime(time - 1000), active ? 1000 : null)
  
  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])
  
  useEffect(() => {
    if (time === 0 && mode === 'session') {
      beep.current.play()
      setMode('break')
      setTime(breakVal * 60 * 1000)
    } else if (time === 0 && mode === 'break') {
      beep.current.play()
      setMode('session')
      setTime(sessionVal * 60 * 1000)
    }
  }, [time, breakVal, sessionVal, mode])
  
  const handleReset = () => {
    beep.current.pause()
    beep.current.currentTime = 0
    setActive(false)
    setMode('session')
    setBreakVal(5)
    setSessionVal(25)
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
          <Timer currentMode={[mode, setMode]} currentTime={[time, setTime]} />
          <Controls
            activeStatus={[active, setActive]}
            handleReset={handleReset}
          />
        </div>
        </div>
        <div className='SetTimeWrapper'>
          <SetTime type={'Break'} value={[breakVal, setBreakVal]} />
          <SetTime type={'Session'} value={[sessionVal, setSessionVal]} />
        </div>
      </main>
      <audio id='beep' src={alarm} ref={beep} />
    </StyledTimeApp>
  )
}

export default TimeApp