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
      ingredients: [],
      action: '',
      currentID: null
    }
  }

  componentDidMount() {
    // check storage & assign to recipes variable the contents if not null, else use default
      const storage = localStorage.getItem('recipes');
      let storedRecipes;
      // set default value if recipes aren't already stored
      const recipes = storage !== "undefined" || storage.length === 0 ? JSON.parse(storage) : [
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

      console.log(recipes);
      localStorage.setItem('recipes', JSON.stringify(recipes))
      storedRecipes = JSON.parse(localStorage.getItem('recipes'));
      this.setState({ recipes: storedRecipes });

  }


  // modal switches
  openModal = () => {
    this.setState({
      action: 'Add Recipe',
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      title: '',
      ingredients: [],
      action: '',
      currentID: null
    });
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
    const title = this.state.title ? this.state.title : "Untitled"
    let newRecipe = {id: newId, title: title, ingredients: this.state.ingredients};
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));

    this.setState({
      title: '',
      ingredients: [],
      showModal: false,
      action: '',
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


editRecipe = (e) => {
  const idToEdit = parseInt(e.target.parentElement.parentElement.id, 10)
  let storedRecipes = JSON.parse(localStorage.getItem('recipes'));
  let recipe = storedRecipes.filter((obj) => obj.id === idToEdit)[0];

  this.setState({
    action: 'Edit Recipe',
    showModal: true,
    title: recipe.title,
    ingredients: recipe.ingredients,
    currentID: idToEdit
  }, () => {
    $('#title').val(this.state.title);
    $('#ingredients').val(this.state.ingredients);
  });
}

saveEdits = (e) => {

  let storedRecipes = JSON.parse(localStorage.getItem('recipes'));

  const newRecipe = {id: this.state.currentID, title: this.state.title, ingredients: this.state.ingredients};
  let newRecipeArr = []
  storedRecipes.forEach((obj) => {
    if (obj.id === this.state.currentID) {
      newRecipeArr.push(newRecipe)
    }
    else {
      newRecipeArr.push(obj);
    }
  });

  localStorage.setItem('recipes', JSON.stringify(newRecipeArr));

  this.setState({
    title: '',
    ingredients: [],
    showModal: false,
    action: '',
    currentID: null,
    recipes: newRecipeArr
  });
}



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
        <h1>My Recipes</h1>
        <AddButton className="addButton"
          openModal={this.openModal}
          />

        { recipeList }

        <RecipeModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          changeState={this.changeState}
          addRecipe={this.addRecipe}
          saveEdits={this.saveEdits}
          action={this.state.action}
          />

      </div>
    );
  }
}




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
