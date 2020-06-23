import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";

import Timer from "../noState/Timer";
import StartButton from "../noState/StartButton";
import Input from "../noState/Input";
import Modal from "../noState/ui/Modal";

const TIME = [0, 30, 0];
const MESSAGE_BREAK = "Time to go back to work";
const MESSAGE_WORK = "Time to take a break!";

const convertTime = (time) => {
  let total = time[2];
  total += time[1] * 60;
  total += time[0] * 3600;
  return total;
};

function Main(props) {
  const [workTime, setWorkTime] = useState(convertTime(TIME));
  const [timeLeft, setTimeLeft] = useState(convertTime(TIME));
  const [counting, setCounting] = useState(false);
  const [settings, setSettings] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(convertTime(TIME));
  const [tripleTime, setTripleTime] = useState([0, 30, 0]);

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

  const inputHandler = (e) => {
    //TODO: fix
    const newTime = [...tripleTime];

    switch (e.target.id) {
      case "hours":
        newTime[0] = e.target.value;
        break;
      case "minutes":
        newTime[1] = e.target.value;
        break;
      case "seconds":
        newTime[2] = e.target.value;
        console.log(newTime);

        break;
      default:
        console.log("Error");
    }
    //input time
    setTripleTime(newTime);
    console.log(convertTime(tripleTime));

    //working time
    setTimeLeft(convertTime(newTime));
    isBreak
      ? setBreakTime(convertTime(newTime))
      : setWorkTime(convertTime(newTime));
    // const time = newTime;
    // setTimeLeft(time);
    // isBreak ? setBreakTime(time) : setWorkTime(time);
  };
  //counter
  //menu
  let input = null;
  if (!counting) {
    input = <Input show={settings} time={tripleTime} change={inputHandler} />;
  }

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
      <Modal show={settings} modalClosed={() => setSettings(false)}>
        {input}
      </Modal>

      <p>
        Your current streak is: {streak} <br /> Nice job, keep going! <br />
        {isBreak ? "Break" : "Work"}
      </p>
    </React.Fragment>
  );
}

export default Main;
