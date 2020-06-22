import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";

import Timer from "../noState/Timer";
import StartButton from "../noState/StartButton";
import Input from "../noState/Input";

const TIME = 20;
const MESSAGE_BREAK = "Time to go back to work";
const MESSAGE_WORK = "Time to take a break!";
function Main(props) {
  const [workTime, setWorkTime] = useState(TIME);
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [counting, setCounting] = useState(false);
  const [settings, setSettings] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(TIME);

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
          // Wheather it is a break or a work session
          if (isBreak) {
            // If break just endded - start a work timer
            setIsBreak(false);
            setTimeLeft(workTime);
            alert(MESSAGE_BREAK);
          } else {
            // Else start a break timer
            setIsBreak(true);
            setTimeLeft(breakTime);
            setStreak(streak + 1);
            alert(MESSAGE_WORK);
          }
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    }
  }, [timeLeft, counting, settings, streak, workTime, isBreak, breakTime]);

  //counter
  //menu

  return (
    // TODO: Add nice looking styles
    <React.Fragment>
      <Timer
        className={classes.Time}
        click={() => setSettings(!settings)}
        left={timeLeft}
        total={isBreak ? breakTime : workTime} //TODO: add logic
      />
      <StartButton click={() => setCounting(!counting)} counting={counting} />
      <br />

      <Input
        show={settings}
        time={timeLeft}
        change={(e) => {
          //TODO: fix
          const time = e.target.value;
          setTimeLeft(time);
          isBreak ? setBreakTime(time) : setWorkTime(time);
        }}
      />
      <p>
        Your current streak is: {streak} <br /> Nice job, keep going! <br />
        {isBreak ? "Break" : "Work"}
      </p>
    </React.Fragment>
  );
}

export default Main;
