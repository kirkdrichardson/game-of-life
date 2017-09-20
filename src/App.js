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
      arrSize: 25
    }
  }

  componentDidMount() {
    let rowArr = [];
    for (let i = 0; i < 50; i++) {
      rowArr.push(<Row className="Row" key={i} />)
    }

    this.setState({ boardArr: rowArr });
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
        row.push(<Cell key={keyId}/>)
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
        <div className="container">
          <table className="Board">
            <tbody>
            { this.state.boardArr }
            </tbody>
            </table>
        </div>
      </div>
    );
  }
}



export default App
