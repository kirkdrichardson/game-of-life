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



// createCellRow = () => {
//   let rowArr = [];
//   for (let i = 0; i < 70; i++) {
//     rowArr.push(
//       <td className="Cell dead"
//       key={"cell-" + i}
//       onClick={this.toggleCell}></td>)
//   }
//   return rowArr;
// }
//
//
// createBoard = () => {
//   let rowArr = this.createCellRow;
//   let board = []; // will be a 2D array
//   for (let i = 0; i < 50; i++) {
//     board.push(<Row
//       className="Row"
//       key={"row-" + i} />)
//   }
//   return board;
// }
