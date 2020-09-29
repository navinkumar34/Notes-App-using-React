import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Editor = ({ EditorText, OnChange, Editable, AddNote, DeletedNote }) => {
  return (
    <div className="editor-container">
      <h5>Editor</h5>
      <Form>
        <FormGroup>
          <Button onClick={AddNote} style={{ background: "Blue" }}>
            Add New Note
          </Button>
        </FormGroup>
        <FormGroup>
          <Label for="notesText">Text Goes Below:</Label>
          <br />
          <Input
            type="textarea"
            name="notesText"
            id="notesText"
            rows="16"
            cols="20"
            onChange={OnChange}
            value={EditorText}
            disabled={Editable}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={DeletedNote} style={{ background: "red" }}>
            Delete Note
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Editor;
