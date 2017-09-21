import React from 'react';
import Square from './Cell.js';


const Row = (props) => {
  let rowArr = [];

  for (let i = 0; i < 70; i++) {
    rowArr.push(
      <td className="Cell dead"
      key={i}
      onClick={props.toggleCell}></td>)
    // rowArr.push(<Square key={"column-" + i} />);
  }

  return (
    <tr className="cellRow row">
      { rowArr }
    </tr>
  )
}


export default Row;
