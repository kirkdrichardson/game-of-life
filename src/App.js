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
      boardArr: [] // 2D array of Square components aligned in columns & rows
    }
  }

  render() {


    return (
      <div className="App">
        <div className="Board">
        { this.state.boardArr}
        </div>
      </div>
    );
  }
}



export default App
