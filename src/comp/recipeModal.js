import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, FieldGroup, HelpBlock} from 'react-bootstrap';


class RecipeModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const buttonText = this.props.action === 'Add Recipe' ? "Save" : "Save Edits"

    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.action}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <ControlLabel>Title</ControlLabel>
        <FormGroup>
          <FormControl
            type="text"
            id="title"
            placeholder="Peach Cobbler"
            onChange={ this.props.changeState } />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Ingredients</ControlLabel>
          <FormControl
            componentClass="textarea"
            id="ingredients"
            placeholder="peaches, cobblers, sugar"
            onChange={ this.props.changeState } />
          <HelpBlock>* Separate ingredients with a comma</HelpBlock>
        </FormGroup>
       </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" type="submit" onClick={this.props.addRecipe}>
            <i className="glyphicon glyphicon-check"></i>
            { buttonText }
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
}





export default RecipeModal
