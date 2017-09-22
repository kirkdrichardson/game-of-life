import React from 'react';

 const Cell = (props) => {

  let style = {
    backgroundColor: "transparent",
  }

  return (
    <div className="Cell" onClick={props.toggleCell}>
      </div>
  );
}


export default Cell;
