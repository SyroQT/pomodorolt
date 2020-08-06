import React from "react";

import classes from "./StartButton.module.css";

const StartButton = ({ click, counting }) => {
  //to do format time
  return (
    <button className={classes.Button} onClick={click}>
      {counting ? "Pause" : "Start"}
    </button>
  );
};
export default StartButton;
