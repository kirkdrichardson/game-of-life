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
      height: 50,
      width: 70,
      running: false,
      generation: 0
    }
  }




  componentDidMount() {
    if (!this.state.running) {
     const board = this.createRandomBoard();
     this.setState({ boardArr: board })
    }
  }




  toggleCell = (e) => {
    const classArr = e.target.classList;
    if (classArr.contains("dead")) {
      classArr.remove("dead");
      classArr.add("alive");
    }
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




  createInitialBoard = () => {
    let rowArr = [];
    let cellStatus;

    for (let i = 0; i < this.state.height; i++) {

      // pass cell status value as props from 2nd dimension of arr

      rowArr.push(<Row
        width={this.state.width}
        className="Row"
        key={"row-" + i}
        toggleCell={this.toggleCell}
        />
      );
    }
    return rowArr;
  }


// map over boardArr of binary values & generate components arr
  generate = () => {
    const prevGen = this.state.boardArr;

    const newGen =
      prevGen.map((row, i) => {
        let cellRow = [];

        row.forEach((cell, i) => {
          // pass binary value of cell as props & push to a row
          cellRow.push(<Cell
            key={"cell-" + i}
            status={cell}
            toggleCell={this.toggleCell} />
          );
        });
        return (
          <Row
            key={"row-" + i}
            className="Row"
            cellsArr={cellRow}
            toggleCell={this.toggleCell}
            />
        );
      });

      return newGen;
  }


  //
  // generateBoard = () => {
  //   let board = [];
  //   // could be refactored to do row only once, then columns (i.e., two separate,
  //   // not nested, for loops. However, to be more flexible & to manipulate individual
  //   // arr elements later, I'll leave this as is for now)
  //   for (let y = 0; y < this.state.arrSize; y++) {
  //     let row = [];
  //     for (let x = 0; x < this.state.arrSize; x++) {
  //       let keyId = 'row-' + x.toString() + 'column-' + y.toString();
  //       row.push(<Cell key={keyId}/>)
  //     }
  //     board.push(row);
  //   }
  //   return board;
  // }






  render() {


    return (
      <div className="App">

      <h3>Generation: {this.state.generation}</h3>

        <div className="container">
          <table className="Board">
            <tbody>

            { this.generate() }

            </tbody>
            </table>
        </div>

        <button
        onClick={this.generate}
        className="btn">
        Start</button>

        <button
        onClick={this.reset}
        className="btn">
        Reset</button>

      </div>
    );
  }
}



export default App
