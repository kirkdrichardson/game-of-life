import React, { Component } from 'react';
import './App.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'
import RecipeModal from './comp/recipeModal.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      recipes: [],
      title: '',
      ingredients: []
    }
  }

  componentDidMount() {
    // check storage & assign to recipes variable the contents if not null, else use default
    const storage = JSON.parse(localStorage.getItem('recipes'));
    let storedRecipes;
    // set default value if recipes aren't already stored
    const recipes = storage.length !== 0 ? storage : [
      { id: 1234,
        title:
          "Chocolate Chip Cookies",
        ingredients: [
          "1/2 cup (1 stick) unsalted butter",
          "3/4 cup packed dark brown sugar",
          "3/4 cup sugar",
          "2 large eggs",
          "1 teaspoon pure vanilla extract",
          "1 (12-ounce) bag semisweet chocolate chips, or chunks",
          "2 1/4 cups all-purpose flour",
          "3/4 teaspoon baking soda",
          "1 teaspoon fine salt"] }
    ];

    localStorage.setItem('recipes', JSON.stringify(recipes))
    storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    this.setState({ recipes: storedRecipes });
  }


  // modal switches
  openModal = () => {
    this.setState({ showModal: true });
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  // handle user input to the modal in state
  changeState = (e) => {
    let value = e.target.value;
    if (e.target.id === "title")
      this.setState({ title: value });
    else if (e.target.id === "ingredients") {
      value = value.split(',');
      this.setState({ ingredients: value });
    }
  }


  // add new recipe to local storage & clear placeholders in state
  addRecipe = () => {
    const newId = Math.floor(Math.random() * 9999);
    let storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    let newRecipe = {id: newId, title: this.state.title, ingredients: this.state.ingredients};
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));

    this.setState({
      title: '',
      ingredients: [],
      showModal: false,
      recipes: storedRecipes
    });
  }


deleteRecipe = (e) => {
  // get the id of the recipeBox parent
  const idToRemove = parseInt(e.target.parentElement.parentElement.id, 10)
  const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
  const newRecipes = storedRecipes.filter((obj) => obj.id !== idToRemove);
  localStorage.setItem('recipes', JSON.stringify(newRecipes));
  this.setState({recipes: newRecipes});
}


// editRecipe = (e) => {
//   const idToEdit = parseInt(e.target.parentElement.parentElement.id, 10)
//   let storedRecipes = JSON.parse(localStorage.getItem('recipes'));
//   let recipe = storedRecipes.filter((obj) => obj.id === idToEdit)[0];
//
//
//   console.log(idToEdit, storedRecipes, recipe, recipe.title, recipe.ingredients);
//   this.setState({ showModal: true })
//
//   //
//   // localStorage.setItem('recipes', JSON.stringify(newRecipes));
//   // this.setState({recipes: newRecipes});
// }



  render() {
    const recipeList = this.state.recipes.map((recipe) => {
      return (
        <RecipeBox
          id={recipe.id}
          key={recipe.id}
          title={recipe.title}
          ingredients={recipe.ingredients}
          openModal={this.openModal}
          editRecipe={this.editRecipe}
          deleteRecipe={this.deleteRecipe}/>
      );
      });


    return (
      <div className="App">
        <h1>RECIPE REPO</h1>
        <AddButton className="addButton"
          openModal={this.openModal}
          />

        { recipeList }

        <RecipeModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          changeState={this.changeState}
          addRecipe={this.addRecipe}/>

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
  return (
    <div className="recipe">

      <h3 className="recipeTitle"
        onClick={() => $('#' + props.id).toggle(500)}>
        {props.title}
      </h3>

      <div className="recipeBody" id={props.id}>
      <Ingredients ingredients={props.ingredients} />
        <ButtonGroup className="btnGroup" bsSize="lg">
          <EditButton editRecipe={props.editRecipe}/>
          <DeleteButton deleteRecipe={props.deleteRecipe}/>
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
       <Button bsStyle="danger" onClick={props.deleteRecipe}>
      <i className="glyphicon glyphicon-trash"></i> Delete
    </Button>
  );
}



const EditButton = (props) => {
  return (
    <Button bsStyle="primary" onClick={props.editRecipe}>
      <i className="glyphicon glyphicon-pencil"></i> Edit
    </Button>
  );
}

const AddButton = (props) => {
  return (
    <Button className="addButton"
      bsSize="lg"
      bsStyle="success"
      onClick={props.openModal}>
      <i className="glyphicon glyphicon-plus"></i> Add
    </Button>
  );
}










export default App
