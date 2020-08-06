import React from "react";
import styles from "./Input.module.css";

const secToTriple = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds];
};

const Input = ({ workTime, breakTime, onChange }) => {
  let input = null;
  const [workH, workM, workS] = secToTriple(workTime);
  const [breakH, breakM, breakS] = secToTriple(breakTime);

  input = (
    <form className={styles.Form}>
      <div id="work-numbers">
        <h1>Work time</h1>
        <input
          type="number"
          placeholder="Hours"
          value={workH === 0 ? "" : workH}
          min="0"
          id="workH"
          onChange={onChange}
        />
        <input
          type="number"
          max="60"
          min="0"
          id="workM"
          placeholder="Minutes"
          value={workM === 0 ? "" : workM}
          onChange={onChange}
        />
        <input
          type="number"
          max="60"
          min="0"
          id="workS"
          placeholder="Seconds"
          value={workS === 0 ? "" : workS}
          onChange={onChange}
        />
      </div>
      <div id="break-numbers">
        <h1>Break time</h1>
        <input
          type="number"
          placeholder="Hours"
          value={breakH === 0 ? "" : breakH}
          id="breakH"
          min="0"
          onChange={onChange}
        />
        <input
          type="number"
          max="60"
          min="0"
          id="breakM"
          placeholder="Minutes"
          value={breakM === 0 ? "" : breakM}
          onChange={onChange}
        />
        <input
          type="number"
          max="60"
          min="0"
          id="breakS"
          placeholder="Seconds"
          value={breakS === 0 ? "" : breakS}
          onChange={onChange}
        />
      </div>
    </form>
  );

  return input;
};
export default Input;
