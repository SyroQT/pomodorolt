import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";

import Timer from "../noState/Timer";
import StartButton from "../noState/StartButton";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

function Main(props) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [displayTime, setDisplayTime] = useState(secondsToHms(timeLeft));
  //button
  const [counting, setCounting] = useState(false);

  // timer
  useEffect(() => {
    if (!counting) {
      return;
    }
    setTimeout(() => {
      //add logic for ending
      if (counting) {
        setTimeLeft(timeLeft - 1);
        setDisplayTime(secondsToHms(timeLeft - 1));
        if (timeLeft === 0) {
          setCounting(false);
          setTimeLeft(900);
          alert("Time is up!");
        }
      }
    }, 1000);
  }, [timeLeft, counting, displayTime]);

  const clickHandler = () => {
    setCounting(!counting);
  };
  //counter
  //menu

  return (
    <React.Fragment>
      <Timer className={classes.Time} left={timeLeft} />
      {/* <StartButton click={setStartBtn(!startBtn)} /> */}
      <button onClick={clickHandler}>Pause, resume</button>
      <p>{displayTime}</p>
    </React.Fragment>
  );
}

export default Main;
