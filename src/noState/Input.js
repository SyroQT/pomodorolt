import React from "react";

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
    <React.Fragment>
      <div>
        <h1>Work time</h1>
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={workH}
          id="workH"
          onChange={onChange}
        />
        <input
          type="number"
          min="0"
          max="60"
          id="workM"
          placeholder="Minutes"
          value={workM}
          onChange={onChange}
        />
        <input
          type="number"
          min="0"
          max="60"
          id="workS"
          placeholder="Seconds"
          value={workS}
          onChange={onChange}
        />
      </div>
      <div>
        <h1>Break time</h1>
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={breakH}
          id="breakH"
          onChange={onChange}
        />
        <input
          type="number"
          min="0"
          max="60"
          id="breakM"
          placeholder="Minutes"
          value={breakM}
          onChange={onChange}
        />
        <input
          type="number"
          min="0"
          max="60"
          id="breakS"
          placeholder="Seconds"
          value={breakS}
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );

  return input;
};
export default Input;
