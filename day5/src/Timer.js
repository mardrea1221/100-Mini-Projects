import React, { useState, useEffect } from "react";


const Timer  = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);


  useEffect(() => {
    // SECONDS 
    const id = setInterval(() => {
      setSeconds((oldCount) => {
        if (oldCount === 59) {
          return 0;
        } else {
          // Increment seconds
          return oldCount + 1;
        }
      });
    }, 1000);
    

    // MINUTES
    const mid = setInterval(() => {
      setMinutes((oldMinutes) => (oldMinutes + 1))
    }, 60000)
        return () => {
        clearInterval(id);
        clearInterval(mid);
        };
    }, []);

    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;


    return <div>{formatMinutes}:{formatSeconds}</div>


}







export default Timer;