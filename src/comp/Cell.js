import React from 'react';

 const Cell = (props) => {
  const isAlive = props.status ? "alive" : "dead";
  return (
    <td
      id={props.id}
      className={"Cell " + isAlive}
      onClick={props.toggleCell} >
      </td>
  );
}


export default Cell;
