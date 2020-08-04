import React from "react";

import classes from "./Timer.module.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h >= 0 ? h + ": " : "";
  var mDisplay = m >= 0 ? m + ": " : "";
  var sDisplay = s >= 0 ? s : null;
  return hDisplay + mDisplay + sDisplay;
}

const Timer = ({ left, click, total }) => {
  //to do format time
  return (
    <div className={classes.Timer} onClick={click}>
      <CircularProgressbar
        styles={buildStyles({
          // Colors
          pathColor: `#8C2F39`,
          textColor: "#461220",
          trailColor: "#B23A48",
        })}
        value={left}
        maxValue={total}
        text={`${secondsToHms(left)}`}
      />
    </div>
  );
};
export default Timer;
