import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class InfoModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Modal
        className="InfoModal"
        show={this.props.showModal}
        onHide={this.props.closeModal}
        onExited={this.props.generate}
        keyboard>

        <Modal.Header className="modalHead" closeButton>
          <Modal.Title>
            The Game of Life
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBod">

          <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>

          <p>The universe of the Game of Life is a two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or "populated" or "unpopulated". Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
          <ul style={{listStyleType: "square"}}>
            <li>Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
          </ul>
          <br />
          <p><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Read More</a></p>
          <br/>
          <p>
            <span>Tip </span>
            <i style={{color: "darkgreen", margin: "10px"}} className="glyphicon glyphicon-share-alt"></i>
            click the cells to give or take life</p>
       </Modal.Body>

        <Modal.Footer className="modalFoot">
        <Button bsStyle="success" type="submit" onClick={this.props.closeModal}>
          <i style={{color: "#222", fontSize: "16px", marginRight: "10px"}} className="glyphicon glyphicon-cog"></i>
          Create a Universe
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
}





export default InfoModal
