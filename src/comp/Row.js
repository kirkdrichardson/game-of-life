import React from 'react';
import Cell from './Cell.js';


const Row = (props) => {
  let rowArr = [];

  for (let i = 0; i < props.width; i++) {
    rowArr.push(
      <Cell
        key={"cell-" + i}
        toggleCell={props.toggleCell} />
      );
  }

  return (
    <tr className="cellRow row">
      { rowArr }
    </tr>
  )
}


export default Row;
