import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";

import Timer from "../noState/Timer";
import StartButton from "../noState/StartButton";
import Input from "../noState/Input";

const TIME = 60;
const MESSAGE = "Time to take a break!";
function Main(props) {
  const [totalTime, setTotalTime] = useState(TIME);
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [counting, setCounting] = useState(false);
  const [settings, setSettings] = useState(false);
  const [streak, setStreak] = useState(0);

  // timer hook
  useEffect(() => {
    if (counting) {
      if (settings) {
        setSettings(false);
      }
      setTimeout(() => {
        //add logic for ending
        if (timeLeft === 0) {
          //TODO: Smart logic for break/work following
          //TODO: Counting the streak of work sessions
          setCounting(false);
          setStreak(streak + 1);
          setTimeLeft(totalTime);
          alert(MESSAGE);
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    }
  }, [timeLeft, counting, settings, streak]);

  //counter
  //menu

  return (
    // TODO: Add nice looking styles
    <React.Fragment>
      <Timer
        className={classes.Time}
        click={() => setSettings(!settings)}
        left={timeLeft}
        total={totalTime}
      />
      <StartButton click={() => setCounting(!counting)} counting={counting} />
      <br />

      <Input
        show={settings}
        time={timeLeft}
        change={(e) => {
          setTimeLeft(e.target.value);
          setTotalTime(e.target.value);
        }}
      />
      <p>
        Your current streak is: {streak} <br /> Nice job, keep going!
      </p>
    </React.Fragment>
  );
}

export default Main;
