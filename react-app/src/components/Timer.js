import React, {useState, useEffect, useRef} from "react";
import {TimerButton} from "../components/TimerButton";
import {TimerTitle} from '../components/TimerTitle';
import {TimerButtonBox} from '../components/TimerButtonBox';
import {TimerContainer} from '../components/TimerContainer';
import {TimerBox} from '../components/TimerBox';
import {TimerInnerCircle} from '../components/TimerInnerCircle';
import {TimerContent} from '../components/TimerContent';
import {TimerSettingButton} from '../components/TimerSettingButton';
import {TimerSettingButtonWrapper} from '../components/TimerSettingButtonWrapper';

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerState] = useState(false);
  const firstStart = useRef(true);
  const renderState = useRef(); // <-- React ref

  const displayMinutes = (minutes) => {
    setMinutes(minutes);
    setSeconds(0)
    setHour(0)
  }

  const displayHour = (hour) => {
    setMinutes(0)
    setSeconds(0)
    setHour(hour)
  }

  const resetTimer = () => {
    setMinutes(0)
    setSeconds(0)
    setHour(0) 
    setTimerState(false)
  }

  const startTimer = () => {
    setTimerState(true);
  }

  const stopTimer = () => {
    setTimerState(false)
  }

  useEffect(() => {
    if(firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }
    if(timerActive) {
      renderState.current = setInterval(() => {
        if(seconds > 0) {
          setSeconds(seconds - 1);
        }
        if(seconds === 0 ) {
          if(minutes === 0) {
            clearInterval(renderState.current)
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
          if(hour !==  0) {
            setHour(hour - 1)
            setMinutes(59);
            setSeconds(59);
          }
        } 
      }, 1000)
      return () => {
        clearInterval(renderState.current);
      };
    }
  }, [seconds, minutes, hour, timerActive])

  const timerHour = hour< 10 ? `0${hour}` : hour;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <TimerContainer>
      <TimerTitle>React timer</TimerTitle>
      <TimerButtonBox>
        <TimerButton onClick={() => {displayMinutes(5)}}>5 minutes</TimerButton>
        <TimerButton onClick={() => {displayMinutes(30)}}>30 minutes</TimerButton>
        <TimerButton  onClick={() => {displayHour(1)}}>1 hour</TimerButton >
      </TimerButtonBox>
      <TimerBox>
        <TimerInnerCircle>
        <TimerContent>
          {timerHour}:{timerMinutes}:{timerSeconds}
        </TimerContent>
      </TimerInnerCircle>
      </TimerBox>
      <TimerSettingButtonWrapper>
        <TimerSettingButton  onClick={startTimer}> Start</TimerSettingButton>
        <TimerSettingButton  onClick={stopTimer}>Stop</TimerSettingButton>
        <TimerSettingButton onClick={resetTimer}> Clear</TimerSettingButton>
      </TimerSettingButtonWrapper>
    </TimerContainer>
  );
}

