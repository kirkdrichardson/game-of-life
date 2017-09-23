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
      height: 50,
      width: 70,
      running: false,
      generation: 0
    }
  }




  componentDidMount() {
    if (!this.state.running) {
     const board = this.createInitialBoard();
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
    const board = this.createInitialBoard();
    console.log(board);
    this.setState({ generation: 0, boardArr: board })
  }

  creatRandomBoard = () => {

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



  generate = () => {
    const prevGen = this.state.boardArr;
    let newGen = prevGen;

    console.log(newGen);

    newGen.map((row, i) => {
      // row.map((cell, i) => {
      //   if (cell.classList.contains("alive")) {
      //     console.log( "cell ", i, " is ALIVE")
      //   }
      // });
    });
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
            { this.state.boardArr }
            </tbody>
            </table>
        </div>

        <button
        onClick={this.generate}
        className="btn">
        Run Generation</button>

        <button
        onClick={this.reset}
        className="btn">
        Reset</button>

      </div>
    );
  }
}



export default App
