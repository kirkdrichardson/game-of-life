import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, FieldGroup, HelpBlock} from 'react-bootstrap';


class RecipeModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "black"}}>
            <ControlLabel>Title</ControlLabel>
            <FormGroup controlId="formControlsTitle">
              <FormControl type="text" placeholder="Peach Cobbler" />
            </FormGroup>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <FormGroup controlId="formControlsIngredients">
          <ControlLabel>Ingredients</ControlLabel>
          <FormControl componentClass="textarea" placeholder="peaches, cobblers, sugar" />
          <HelpBlock>* Separate ingredients with a comma</HelpBlock>
        </FormGroup>
       </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={this.props.addRecipe}>
            <i className="glyphicon glyphicon-check"></i> Save
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
}





export default RecipeModal
