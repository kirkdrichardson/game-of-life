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

      <ToggleButton value={1} bsStyle="primary">
        50x30
      </ToggleButton>

      <ToggleButton value={2} bsStyle="primary">
        60x40
      </ToggleButton>

      <ToggleButton value={3} bsStyle="primary">
        70x50
      </ToggleButton>

    </ToggleButtonGroup>
  )
}

export default DisplayBar
