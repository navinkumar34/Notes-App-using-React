import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const Notes = ({ notesArr, showText, DeletedNote }) => {
  return (
    <>
      <h5>Notes</h5>
      <ButtonGroup vertical>
        {notesArr.map((note, noteIndex) => {
          return (
            <Button
              key={noteIndex}
              onClick={showText}
              value={note}
              noteindex={noteIndex}
              color="link"
            >
              {note.substr(0, 15) + "..."}
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};

export default Notes;
