import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";

import Timer from "../noState/Timer";
import StartButton from "../noState/StartButton";
import Input from "../noState/Input";
import Modal from "../noState/ui/Modal";
import Info from "../noState/Info";

const TIME = 180;
const MESSAGE_BREAK = "Time to go back to work";
const MESSAGE_WORK = "Time to take a break!";
/* Helper functions */
const secToTriple = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds];
};

const tripleToSec = (time) => {
  return time[0] * 3600 + time[1] * 60 + time[2];
};

function Main(props) {
  /* 
  laikas darbui laikas pertraukai
  arPertrauka arSkaiciuojam
  laikasSekundemis
  */
  // Main variables for work and break
  const [workTime, setWorkTime] = useState(TIME);
  const [breakTime, setBreakTime] = useState(TIME);
  const [streak, setStreak] = useState(0);
  // Bools
  const [settings, setSettings] = useState(false);
  const [counting, setCounting] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [timeLeft, setTimeLeft] = useState(TIME);

  // timer hook
  useEffect(() => {
    if (counting) {
      if (settings) {
        // we cant open setting if counting
        setSettings(false);
      }
      // set 1 sec timeout
      setTimeout(() => {
        // we end the counting
        if (timeLeft === 0) {
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
          // we count down 1 sec at a time
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    }
  }, [timeLeft, counting, settings, streak, workTime, isBreak, breakTime]);

  // Handlina Inputa is jo componento
  const inputHandler = (e) => {
    const timeWork = secToTriple(workTime);
    const timeBreak = secToTriple(breakTime);
    // Atrenka kuri fielda pakeitem
    switch (e.target.id) {
      case "workH":
        timeWork[0] = Number(e.target.value);
        break;
      case "workM":
        timeWork[1] = Number(e.target.value);
        break;
      case "workS":
        timeWork[2] = Number(e.target.value);
        break;
      case "breakH":
        timeBreak[0] = Number(e.target.value);
        break;
      case "breakM":
        timeBreak[1] = Number(e.target.value);
        break;
      case "breakS":
        timeBreak[2] = Number(e.target.value);
        break;
      default:
        console.log("Error");
    }
    // Atnaujinam state
    setWorkTime(tripleToSec(timeWork));
    setBreakTime(tripleToSec(timeBreak));

    isBreak
      ? setTimeLeft(tripleToSec(timeBreak))
      : setTimeLeft(tripleToSec(timeWork));
  };
  //counter
  //menu
  let input = null;
  if (!counting) {
    input = (
      <Input
        workTime={workTime}
        breakTime={breakTime}
        onChange={inputHandler}
      />
    );
  }

  return (
    // TODO: Add nice looking styles
    <React.Fragment>
      <Timer
        className={classes.Time}
        click={() => (counting ? null : setSettings(!settings))}
        left={timeLeft}
        total={isBreak ? breakTime : workTime}
      />
      <Info isBreak={isBreak} />
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
