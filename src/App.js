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
      createLife: true,
      boardArr: [],  // 2D array of Square components aligned in columns & rows
      running: false,
      generation: 0
    }
  }

  componentDidMount() {
    let rowArr = [];
    for (let i = 0; i < 50; i++) {
      rowArr.push(<Row
        className="Row"
        key={i}
        toggleCell={this.toggleCell}/>)
    }

    this.setState({ boardArr: rowArr });
  }




  toggleCell = (e) => {
    const classArr = e.target.classList;
    console.log(classArr);
    if (classArr.contains("dead")) {
      classArr.remove("dead");
      classArr.add("alive");
    }
  }

  reset = () => {

    this.setState({ generation: 0 })
  }
  generate = () => {
    const prevGen = this.state.boardArr;
    let newGen = prevGen;

    console.log(newGen);

    newGen.map((row, i) => {
      console.log(row);
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
