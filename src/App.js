import React, { Component } from 'react';
import './App.css'
import Square from './comp/Square.js'
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createLife: true,
      boardArr: [],  // 2D array of Square components aligned in columns & rows
      arrSize: 25
    }
  }


  // probably going to need to create a row component so that this renders correctly. Also, try bootstrap to get more precise columns

  generateBoard = () => {
    let board = [];
    // could be refactored to do row only once, then columns (i.e., two separate,
    // not nested, for loops. However, to be more flexible & to manipulate individual
    // arr elements later, I'll leave this as is for now)
    for (let y = 0; y < this.state.arrSize; y++) {
      let row = [];
      for (let x = 0; x < this.state.arrSize; x++) {
        let keyId = 'row-' + x.toString() + 'column-' + y.toString();
        row.push(<Square key={keyId}/>)
      }
      board.push(row);
    }
    return board;
  }

  render() {

    const initialBoard = this.generateBoard();
    console.log(initialBoard);

    return (
      <div className="App">
        <div className="Board">
        {initialBoard}
        </div>
      </div>
    );
  }
}



export default App
