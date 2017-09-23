import React, { Component } from 'react';
import './App.css'
import Cell from './comp/Cell.js';
import Row from './comp/Row.js'
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardArr: [],  // 2D array of components aligned in columns & rows
      componentsArr: [],
      height: 10,
      width: 10,
      running: true,
      generation: 0
    }

    // this.toggleCell = this.toggleCell.bind(this);
    // this.reset = this.reset.bind(this);
    // this.createRandomBoard = this.reset.bind(this);
    // this.generate = this.generate.bind(this);
    // this.
  }




  componentDidMount() {

      // load a random configuration by default
      // if (this.state.generation === 0) {
      //   this.setState({
      //     boardArr: this.createRandomBoard()
      //   }, () => this.setState({componentsArr: this.generate().componentsArr}));
      // }


      // currently does not render a board, although the state does get updated with a board
      // I suspect the component doesn't rerender when state changes

      // look into lifecycle methods so that this code is run whenever state changes
      //

      if (this.state.running) {

        if (this.state.boardArr.length === 0) {

          this.setState({
            boardArr: this.createRandomBoard()
          });
        }

        else if (this.state.boardArr.length > 0) {

          const boardObj = this.generate();
          this.setState({
            boardArr: boardObj.newBoard
          }, () => this.setState({
            componentsArr: boardObj.componentsArr,
            generation: this.state.generation + 1
          }));
        }
      }


    //   // continuously generate new boards if running
    //  if (this.state.running) {
    //    const boardObj = this.generate();
    //    console.log(boardObj)
    //    const components = boardObj.componentsArr; // used to render board
    //    const newBoard = boardObj.newBoard; // used to conditionally assign cell values
     //
    //    this.setState({
    //      boardArr: newBoard,
    //      componentsArr: components
    //    });
    //  }
  }



  // on click, switches to cell to opposite state by toggling class
  toggleCell = (e) => {
    const classArr = e.target.classList;
    if (classArr.contains("dead")) {
      classArr.remove("dead");
      classArr.add("alive");
    }
    else {
      classArr.remove("alive");
      classArr.add("dead");
    }
  }



  toggleStart = () => {
    this.setState({ running: !this.state.running });
  }

  reset = () => {
    const board = this.createRandomBoard();
    this.setState({ generation: 0, boardArr: board })
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


// return arr of the values of the 8 cells surrounding current cell
// if row or cell is on edge, returns an empty arr
  getNeighborsArr = (row, cell) => {
    const selfId = `${row}${cell}`;
    const board = this.state.boardArr;
    let neighborsArr = [];

    // from a starting cell, check the top, middle, & bottom rows
    for (let i = -1; i <= 1; i++) {
      // check the left, middle, & right cells
      for (let j = -1; j <= 1; j++) {
        // if that cell is defined, push to return arr

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
    return neighborsArr;
  }

// if reduced neighbors arr > 3, die; if === 3, live; if < 2, die

// takes the state of the board, & returns a new 2D arr w/ cells changed based on neighbors






// map over boardArr of binary values & return new binary board & components arr in obj
  generate = () => {
    const prevGen = this.state.boardArr;

    const newGen =
      prevGen.map((row, rowIdx) => {
        let cellRow = [];

        row.forEach((cell, cellIdx) => {


          let temp = this.getNeighborsArr(rowIdx, cellIdx);
          if (temp.length > 0) {
            console.log(`neighbors at [${rowIdx}, ${cellIdx}] are ${temp}`);

          }


          // pass binary value of cell as props & push to a row
          cellRow.push(<Cell
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
      });

      return {
        "componentsArr": newGen,
        "newBoard": []
      };
  }





  render() {
    return (
      <div className="App">

      <h3>Generation: {this.state.generation}</h3>

        <div className="container">
          <table className="Board">
            <tbody>

            { this.state.componentsArr }

            </tbody>
            </table>
        </div>

        <button
          onClick={this.toggleStart}
          className="btn">
          {!this.state.running && "Start" || this.state.running && "Pause"}
        </button>

        <button
        onClick={this.reset}
        className="btn">
        Reset</button>

      </div>
    );
  }
}



export default App
