import React from 'react';

const Row = (props) => {

  return (
    <tr className="cellRow row">
      { props.cellsArr }
    </tr>
  )
}


export default Row;
