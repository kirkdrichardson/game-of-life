import React, { Component } from 'react';
import './App.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'
import RecipeModal from './comp/recipeModal.js'

console.log($)
/*
App
 - recipe
    - title
    - ingredientson
    - delete button
    - edit button
*/

const recipes = [
  {title: "Ribs", ingredients: ["meat", "onions", "poo"]},
  {title: "RibsBig", ingredients: ["bigmeat", "onions", "poo"]},
  {title: "RibsSmall", ingredients: ["smallmeat", "onions", "poo"]}

];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  openModal = () => {
    this.setState({ showModal: true });
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="App">
        <h1>Recipe Repo</h1>

        <RecipeBox openModal={this.openModal}/>

        <RecipeModal
          showModal={this.state.showModal}
          closeModal={this.closeModal} />

      </div>
    );
  }
}






const RecipeBox = (props) => {
  return (
    <div className="recipe">

      <AddButton className="addButton" openModal={props.openModal}/>

      <h3>Ribs</h3>

      <div className="recipeBody">
        <ol>
          <li>apple</li>
          <li>apple</li>
        </ol>
        <ButtonGroup bsSize="md">
          <DeleteButton />
          <EditButton />
        </ButtonGroup>
      </div>

    </div>
  );
}




const DeleteButton = (props) => {
  return (
       <Button bsStyle="danger" onClick={() => alert('hello')}>
      <i className="glyphicon glyphicon-trash"></i> Delete
    </Button>
  );
}



const EditButton = (props) => {
  return (
    <Button bsStyle="primary" onClick={() => alert('hello')}>
      <i className="glyphicon glyphicon-pencil"></i> Edit
    </Button>
  );
}

const AddButton = (props) => {
  return (
    <Button className="addButton" bsStyle="success" onClick={props.openModal}>
      <i className="glyphicon glyphicon-plus"></i> Add
    </Button>
  );
}










export default App
