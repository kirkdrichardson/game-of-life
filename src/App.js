import React, { Component } from 'react';
import './App.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'
import RecipeModal from './comp/recipeModal.js'

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
    const recipeList = recipes.map((recipe) => {
      return (
        <RecipeBox
          key={recipe.title}
          title={recipe.title}
          ingredients={recipe.ingredients}
          openModal={this.openModal} />
      );
      });

    return (
      <div className="App">
        <h1>Recipe Repo</h1>
        <AddButton className="addButton" openModal={this.openModal}/>

        { recipeList }

        <RecipeModal
          showModal={this.state.showModal}
          closeModal={this.closeModal} />

      </div>
    );
  }
}




// make this a row that contains the recipe & add conditional rendering for
// the read-only recipe text (pull it from the recipes arr at the top)
// on edit, a modal should pop up that allows editing of the recipe text
// find a way to reuse the modal component so that the recipe data can be loaded
// into it. Might have to capture the button values to determine how to assign
// variables for the placeholder text

// also, figure out how to add text to the recipe box. It probably doesn't need to be in
// state, but the save button will have to submit the form data so that it can be
// appended as an object to the end of an array

const RecipeBox = (props) => {
  const title = props.title;
  return (
    <div className="recipe">

      <h3 className="recipeTitle" onClick={() => $('#' + title).toggle(500)}>
        {props.title}
      </h3>

      <div className="recipeBody" id={props.title}>
      <Ingredients ingredients={props.ingredients} />
        <ButtonGroup bsSize="md">
          <EditButton />
          <DeleteButton />
        </ButtonGroup>
      </div>

    </div>
  );
}

const Ingredients = (props) => {
  const list = props.ingredients.map((e, i) => <li key={i}>{e}</li>);
  return (<ul>{ list }</ul>);
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
