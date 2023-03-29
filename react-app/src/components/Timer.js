import React, {useState, useEffect, useRef} from "react";

import '../components/Timer.css';

 

export default function Timer() {

  const [hour, setHour] = useState(0);

  const [minutes, setMinutes] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [timerActive, setTimerState] = useState(false);

  const firstStart = useRef(true);

  const tick = useRef(); // <-- React ref

 

  // const toggleStart = () => {

  //   setTimerState(!timerActive);

  // };

 

//   const [displayMessage, setDisplayMessage] = useState(false);

//   const [displayMessage, setDisplayMessage] = useState(new data());

 

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

    // setTimerState(false)

 

    setMinutes(0)

    setSeconds(0)

    setHour(0)

  }

  const stopTimer = () => {

    setTimerState(false)

   

 

  }

  // const useSetInterval = (minutes, seconds, hours) => {

  //   let interval = setInterval(() => {

 

  //     setMinutes(minutes);

  //     setSeconds(seconds);

  //     setHour(hours);

  //     return clearInterval(interval);

  //   }, 1000);

  // }

 

  useEffect(() => {

    // if (firstStart.current) {

    //   firstStart.current = !firstStart.current;

    //   return;

    // }

    if(timerActive){

      startTimer()

    }

  }, [seconds, minutes, hour, timerActive])

 

  const startTimer =  () => {

    setTimerState(true);

    let myInterval = setInterval(() => {

 

      if (seconds > 0) {

        setSeconds(seconds - 1);

      }

      if (seconds === 0 ) {

        if (minutes === 0) {

            clearInterval(myInterval)

        } else {

            setMinutes(minutes - 1);

            setSeconds(59);

            // setHour(hour - 1)

        }

       

      }

      // if(minutes === 0){

      //   if(seconds=== 0 && hour === 0){

      //     clearInterval(myInterval)

      //   }else{

      //     setHour(hour - 1);

      //     setMinutes(59)

      //     setSeconds(59);

 

      //   }

      // }

      // else if(minutes === 0){

      //   if (seconds === 0) {

      //     clearInterval(myInterval)

      // } else {

      //     setHour(hour - 1)

      //     setMinutes(59);

      //     setSeconds(59);

      //   }

 

      // }

    }, 1000)

  return ()=> {

      clearInterval(myInterval);

    };

 

  }

 

  const timerHour = hour< 10 ? `0${hour}` : hour;

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

 

  return (

    <div>

      <div className="timer">

        {timerHour}:{timerMinutes}:{timerSeconds}

      </div>

       <button onClick={() => {displayMinutes(5)}}>5 minutes</button>

       <button onClick={() => {displayMinutes(30)}}>30 minutes</button>

       <button onClick={() => {displayHour(1)}}>1 hour</button>

       <div className="button-actions-wrapper">

         <button onClick={startTimer}>Start</button>

         <button onClick={stopTimer}>Stop</button>

         <button onClick={resetTimer}>Clear</button>

       </div>

    </div>

  );

}