import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/header";
import Folders from "./components/folders";
import Notes from "./components/notes";
import Editor from "./components/editor";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function App() {
  const [data, setData] = useState(
    window.localStorage.getItem("notes-data")
      ? JSON.parse(window.localStorage.getItem("notes-data"))
      : {
          React: ["What is react", "What are hooks"],
          NodeJS: ["what is node", "what is session"]
        }
  );

  const [curNotes, setCurNotes] = useState([]);
  const [curText, setCurText] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(-1);
  const [selectedNotes, setSelectedNotes] = useState(-1);
  const [disableEdit, setDisableEdit] = useState(true);
  const [newFolder, setNewFoler] = useState("");

  const sNotes = (event) => {
    setCurNotes(data[event.target.value]);
    setSelectedFolder(event.target.value);
    setSelectedNotes(-1);
    setCurText("");
    setDisableEdit(true);
  };

  const sText = (event) => {
    setCurText(event.target.value);
    setSelectedNotes(event.target.getAttribute("noteindex"));
    setDisableEdit(false);
  };

  const textChange = (event) => {
    setCurText(event.target.value);
    const modifiedProp = data[selectedFolder];
    modifiedProp[selectedNotes] = event.target.value;
    setData({
      ...data,
      [selectedFolder]: modifiedProp
    });
    setCurNotes(data[selectedFolder]);
  };

  const newFolderName = (event) => {
    setNewFoler(event.target.value);
  };

  const AddNewFolder = (event) => {
    event.preventDefault();
    newFolder === "" ? setData(data) : setData({ ...data, [newFolder]: [] });
    newFolder === ""
      ? toast.error("Enter Folder name")
      : toast.success("Folder Created...");
    setNewFoler("");
  };

  const DeleteFolder = (event) => {
    event.preventDefault();
    const newData = { ...data };
    delete newData[selectedFolder];
    selectedFolder !== -1
      ? toast.info("Folder Deleted...")
      : toast.error("Select a Folder to Delete.....");
    setData(newData);
    setCurNotes([]);
    setCurText("");
    setDisableEdit(true);
    setSelectedFolder(-1);
  };

  const addNewNote = (event) => {
    event.preventDefault();
    selectedFolder !== -1 ? setDisableEdit(false) : setDisableEdit(disableEdit);
    selectedFolder !== -1 ? setCurText("") : setCurText(curText);
    selectedFolder !== -1
      ? setData({
          ...data,
          [selectedFolder]: data[selectedFolder].concat([""])
        })
      : setData(data);
    selectedFolder !== -1
      ? setSelectedNotes(data[selectedFolder].length)
      : setSelectedNotes(-1);
    selectedFolder !== -1
      ? setCurNotes(data[selectedFolder].concat([""]))
      : setCurNotes(curNotes);
    selectedFolder !== -1
      ? toast.success("Note added...")
      : toast.error("Select a Folder to Add New Note.....");
  };

  const deletenote = (event) => {
    event.preventDefault();
    selectedNotes !== -1 ? setDisableEdit(true) : setDisableEdit(disableEdit);
    selectedNotes !== -1 ? setCurText("") : setCurText(curText);
    const newnotes = selectedNotes !== -1 ? data[selectedFolder] : null;
    const removed =
      selectedNotes !== -1 ? newnotes.splice(selectedNotes, 1) : null;
    selectedNotes !== -1
      ? setData({
          ...data,
          [selectedFolder]: newnotes
        })
      : setData(data);
    removed !== null ? setCurNotes(newnotes) : setCurNotes(curNotes);
    removed !== null
      ? toast.info("Note Deleted")
      : toast.error("Select a Note to Delete.....");
    setSelectedNotes(-1);
  };

  useEffect(() => {
    window.localStorage.setItem("notes-data", JSON.stringify(data));
  });
  return (
    <div className="App">
      <Header />
      <Container style={{ margin: "0px" }}>
        <Row>
          <Col xs="3" style={{ background: "#2c3e50" }}>
            <Folders
              Data={data}
              ShowNotes={sNotes}
              NewFolderName={newFolder}
              AddFolder={AddNewFolder}
              HandleText={newFolderName}
              Delete={DeleteFolder}
              btnText={selectedFolder !== -1 ? ": " + selectedFolder : ""}
            />
          </Col>
          <Col xs="3" style={{ background: "#bdc3c7" }}>
            <Notes notesArr={curNotes} showText={sText} />
          </Col>
          <Col xs="5">
            <Editor
              EditorText={curText}
              OnChange={textChange}
              Editable={disableEdit}
              AddNote={addNewNote}
              DeletedNote={deletenote}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
