import React, { Component } from 'react';


const BoardControlBar = (props) => {
  return (

    <div className="controlBar">
      <button onClick={props.toggleStart} className="btn">
        {!props.running ? "Start" : "Pause"}
      </button>

      <button onClick={props.reset} className="btn">
        Reset
      </button>

      <button onClick={props.clear} className="btn">
        Clear
      </button>
    </div>
  );
}

export default BoardControlBar;
