import React from 'react';
import { Button } from 'react-bootstrap';


const BoardControlBar = (props) => {
  return (
    <div className="controlBar">
      <Button onClick={props.toggleStart} bsStyle="success">
        {!props.running ? "Start" : "Pause"}
      </Button>

      <Button onClick={props.reset} bsStyle="success">
        Reset
      </Button>

      <Button onClick={props.clear}  bsStyle="success">
        Clear
      </Button>
    </div>
  );
}

export default BoardControlBar;
