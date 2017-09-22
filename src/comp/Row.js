import React from 'react';
import Cell from './Cell.js';


const Row = (props) => {

  return (
    <tr className="cellRow row">
      { props.cellsArr }
    </tr>
  )
}


export default Row;
