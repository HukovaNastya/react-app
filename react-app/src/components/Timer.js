import React, {useState, useEffect, useRef, useMemo} from "react";
import {TimerButton} from "./TimerButton";
import {TimerTitle} from './TimerTitle';
import {TimerButtonBox} from './TimerButtonBox';
import {TimerBox} from './TimerBox';
import {TimerContent} from './TimerContent';
import {TimerSettingButton} from './TimerSettingButton';
import {TimerSettingButtonWrapper} from './TimerSettingButtonWrapper';
import './Timer.css';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerState] = useState(false);
  const renderState = useRef(null);
  // const [date, setDate] = useState(null)

  const timerEndDate = useMemo(() => {
    if (hour === 0 && minutes === 0 && seconds === 0) return '-'

    const dateCopy = new Date();
    dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    dateCopy.setHours(dateCopy.getHours() + hour);

    return dateCopy.toLocaleString('eu-UA', options)
  }, [minutes, hour, seconds])

  // function timerEndDate(minutes, hour, seconds) {
  //   const dateCopy = new Date();
  //   dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
  //   dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
  //   dateCopy.setHours(dateCopy.getHours() + hour);
  //
  //   return dateCopy.toLocaleString('eu-UA', options)
  // }

  const setTime = (hours = 0, minutes = 0, seconds = 0) => {
    setTimerState(false);
    setHour(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  }

  const resetTimer = () => {
    setMinutes(0)
    setSeconds(0)
    setHour(0) 
    setTimerState(false)
    // setDate(null)
  }

  const startTimer = () => {
    if (hour === 0 && minutes === 0 && seconds === 0) return

    setTimerState(true)
    // setDate(timerEndDate(minutes, hour, seconds))
  }
  
  const stopTimer = () => {
    setTimerState(false)
    // setDate(null)
  }

  useEffect(() => {
    if(timerActive) {
      renderState.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hour === 0) {
              clearInterval(renderState.current)
              renderState.current = null
              setTimerState(false)
            } else {
              setHour(hour - 1)
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } 
      }, 1000)
      return () => {
        clearInterval(renderState.current);
      };
    }
  }, [seconds, minutes, hour, timerActive])

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <div className="timer-container">
     <TimerTitle>React timer</TimerTitle>
       <TimerTitle>
         { timerEndDate }
       </TimerTitle>
      <TimerButtonBox>
        <TimerButton onClick={() => {setTime(0, 5, 0)}}>5 minutes</TimerButton>
        <TimerButton onClick={() => {setTime(0, 15, 0)}}>15 minutes</TimerButton>
        <TimerButton onClick={() => {setTime(0, 30, 0)}}>30 minutes</TimerButton>
        <TimerButton onClick={() => {setTime(1, 0, 0)}}>1 hour</TimerButton>
        <TimerButton onClick={() => {setTime(2, 0, 0)}}>2 hour</TimerButton>
        <TimerButton onClick={() => {setTime(4, 0, 0)}}>4 hour</TimerButton>
        <TimerButton onClick={() => {setTime(6, 0, 0)}}>6 hour</TimerButton>
      </TimerButtonBox>
      <TimerBox>
        <TimerContent>
          {formatTime(hour)}:{formatTime(minutes)}:{formatTime(seconds)}
        </TimerContent>
      </TimerBox>
      <TimerSettingButtonWrapper>
        <TimerSettingButton onClick={startTimer}> Start</TimerSettingButton>
        <TimerSettingButton onClick={stopTimer}>Stop</TimerSettingButton>
        <TimerSettingButton onClick={resetTimer}> Clear</TimerSettingButton>
      </TimerSettingButtonWrapper>
    </div>
  );
}

