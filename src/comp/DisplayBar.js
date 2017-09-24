import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


const DisplayBar = (props) => {
  return (

    <ToggleButtonGroup
      type="radio"
      name="display"
      className="DisplayBar"
      defaultValue={2}
      onChange={props.toggleDisplay}
      justified>

      <ToggleButton value={1} className="btn">
        50x30
      </ToggleButton>

      <ToggleButton value={2} className="btn">
        60x40
      </ToggleButton>

      <ToggleButton value={3} className="btn">
        70x50
      </ToggleButton>

    </ToggleButtonGroup>
  )
}

export default DisplayBar
