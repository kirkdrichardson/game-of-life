import React, { Component } from 'react';
import './App.css'
import Cell from './comp/Cell.js';
import Row from './comp/Row.js'
import DisplayBar from './comp/DisplayBar.js'
import InfoModal from './comp/InfoModal.js'
import BoardControlBar from './comp/BoardControlBar.js'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      boardArr: [],  // 2D array of components aligned in columns & rows
      componentsArr: [],
      height: 40,
      width: 60,
      running: true,
      generation: 0
    }
  }

  componentDidMount() {
      // loads a random configuration by default
    if (this.state.generation === 0) {
      this.setState({ boardArr: this.createRandomBoard() })
    }
  }



 // BUTTON FUNCTIONS

  // pauses or starts the generate Fx
  toggleStart = () => {
    if (this.state.running) {
      clearInterval(this.generateId);
    }
    else {
      this.generateId = setInterval(this.generate, 300);
    }
    this.setState({ running: !this.state.running });
  }



  // clears & restarts w/ a new random configuration
  reset = () => {
    const board = this.createRandomBoard();
    this.setState({ generation: 0, boardArr: board })
  }


  // removes all active cells
  clear = () => {
    let board = [];
    for (let row = 0; row < this.state.height; row++) {
      let rowArr = [];
      for (let column = 0; column < this.state.width; column++) {
        rowArr.push(0);
      }
      board.push(rowArr);
    }
    this.setState({ boardArr: board});
  }


  // assigns new dimensions to grid on click of a display button
  toggleDisplay = (value) => {
    const width = value === 1 ? 50 : value === 2 ? 60 : 70;
    const height = width === 50 ? 30 : width === 60 ? 40 : 50;

     // pause board before refitting
    if (this.state.running) {
      this.toggleStart();
    }
     // clear the board, and allow new generation at specified height & width
    this.setState({
      boardArr: [],
      width: width,
      height: height,
      generation: 0
    }, this.toggleStart);
  }




// BOARD FUNCTIONS


  // on click, switches to cell to opposite state by toggling class
  toggleCell = (e) => {
      // cell id is str of indices in form "row,cell"
      const idx = e.target.id.split(',');
      let board = this.state.boardArr;
       // if cell was 0, cell == 1, else cell == 0
      let cell = board[ parseInt(idx[0], 10) ][ parseInt(idx[1], 10) ] ? 0 : 1;
      board[ parseInt(idx[0], 10) ][ parseInt(idx[1], 10) ] = cell;
      this.setState({ boardArr: board });
  }


  // generates a random board state to be mapped through
  createRandomBoard = () => {
    let board = [];
    for (let row = 0; row < this.state.height; row++) {
      let rowArr = [];
      for (let column = 0; column < this.state.width; column++) {
        rowArr.push(Math.floor(Math.random() * 2));
      }
      board.push(rowArr);
    }
    return board;
  }



// boardArr FUNCTIONS


    // arguments: the current board (arr), and the indices of a row & cell (int)
    // returns sum of the values of the 8 cells surrounding current cell
    // if row or cell is on edge, returns an empty arr
  getNeighborsSum = (board, row, cell) => {
    const selfId = `${row}${cell}`;
    let neighborsArr = [];
      // from a starting cell, check the top, middle, & bottom rows
    for (let i = -1; i <= 1; i++) {
      // check the left, middle, & right cells
      for (let j = -1; j <= 1; j++) {
        let neighbor, cellId;
        // if not the top or bottom row, assign indices for the 3 neighbor rows
        if ( (row - 1) >= 0 && (row + 1) <= (this.state.height - 1) ) {
          let neighborRow = board[row + i]; // assign row if not the first or last arr in board
          cellId = `${row + i}${cell + j}`; // use to filter center cell from neighborsArr

          // if the cell is not on an edge, assign the 8 neigbor cells
          if (  cellId !== selfId && (cell - 1) >= 0 && (cell + 1) <= (this.state.width - 1) ) {
            neighbor = neighborRow[cell + j];
          }
        }
        // if the cell is not on an edge, push it's neighbor's values
        if (neighbor !== undefined) {
          neighborsArr.push(neighbor);
        }
      }
    }
    return neighborsArr.reduce((sum, cell) => sum + cell, 0);
  }

// if reduced neighbors arr > 3, die; if === 3, live; if < 2, die

// takes the state of the board, & returns a new 2D arr w/ cells changed based on neighbors






// map over boardArr of binary values & return new binary board & components arr in obj
  generate = () => {
    // if boardArr is defined, use it, else use a random configuration
    const prevGenBinary = this.state.boardArr.length ? this.state.boardArr : this.createRandomBoard();
    let newGenBinary = [], rowArr, sumOfNeighbors;

    for (var i = 0; i < prevGenBinary.length; i++) {
      rowArr = [];
      for (var j = 0; j < prevGenBinary[i].length; j++) {

        sumOfNeighbors = this.getNeighborsSum(prevGenBinary, i, j);
          // if < 2 neighbors, cell dies (underpopulation); also handle edge cases (where neighborsArr.length = 0)
        if (sumOfNeighbors < 2) {
          rowArr.push(0);
        }
         // if 2 neighbors, retain cell's existing value (equilibrium)
        else if (sumOfNeighbors === 2) {
          rowArr.push(prevGenBinary[i][j]);
        }
          // if 3 neighbors, it is either born or remains alive (reproduction)
        else if (sumOfNeighbors === 3) {
          rowArr.push(1);
        }
          // if more than 3 neighbors, cell dies (overpopulation)
        else if (sumOfNeighbors > 3) {
          rowArr.push(0);
        }
          // error handling. Should not run.
        else {
          console.log("Error calculating neighbors in generate Fx");
          rowArr.push(0);
        }
      }
      newGenBinary.push(rowArr);
    }

    this.setState({
      boardArr: newGenBinary,
      generation: this.state.generation + 1
    });
  }


  render() {
    return (
      <div className="App">

       <InfoModal
       showModal={this.state.showModal}
       closeModal={() => this.setState({showModal: false})}
       generate={() =>  this.generateId = setInterval(this.generate, 300)}/>

      <h3>
        <span className="headerSpan"></span>
        Generation:
        <span className="headerSpan">{this.state.generation}</span>
      </h3>

        <div className="container">
          <BoardControlBar
            toggleStart={this.toggleStart}
            running={this.state.running}
            reset={this.reset}
            clear={this.clear}/>

          <table className="Board">
            <tbody>
            { /* generate components from 2D boardArr. if cell == 0, dead, else alive */ }
            { this.state.boardArr.map((row, rowIdx) => {
              let cellRow = [];
              row.forEach((cell, cellIdx) => {
                // pass binary value of cell as props & push to a row
                cellRow.push(<Cell
                  id={`${rowIdx},${cellIdx}`}
                  key={"cell-" + cellIdx}
                  status={cell}
                  toggleCell={this.toggleCell} />
                );
              });
              return (
                <Row
                  key={"row-" + rowIdx}
                  className="Row"
                  cellsArr={cellRow}
                  toggleCell={this.toggleCell}
                  />
              );
            }) }
            </tbody>
            </table>
            <DisplayBar
              toggleDisplay={this.toggleDisplay}/>
        </div>
      </div>
    );
  }
}



export default App
