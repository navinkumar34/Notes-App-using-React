import React from "react";
import { Button, ButtonGroup, Input } from "reactstrap";

const Folders = ({
  Data,
  ShowNotes,
  NewFolderName,
  AddFolder,
  HandleText,
  Delete,
  btnText
}) => {
  return (
    <>
      <h5>Folders</h5>
      <ButtonGroup vertical>
        {Object.keys(Data).map((key, keyIndex) => {
          return (
            <Button onClick={ShowNotes} value={key} key={keyIndex} color="link">
              {key}
            </Button>
          );
        })}
      </ButtonGroup>
      <br />
      <br />
      <Input
        type="text"
        name="Fname"
        id="fname"
        value={NewFolderName}
        onChange={HandleText}
        placeholder="Enter Folder Name...."
      />
      <Button onClick={AddFolder} style={{ background: "green" }}>
        Add Folder
      </Button>
      <br />
      <br />
      <Button onClick={Delete} style={{ background: "red" }}>
        Delete Folder {btnText}
      </Button>
    </>
  );
};

export default Folders;
