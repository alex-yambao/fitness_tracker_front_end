import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateRoutine.css";
import { createNewRoutine } from "../api";

const CreateRoutine = ({ handleClose, handleSetMyRoutinesList }) => {
  const [creationMessage, setCreationMessage] = useState(null);
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineGoal, setNewRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const messageDiv = creationMessage ? (
    <div className="message">{creationMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return newRoutineName.length > 0 && newRoutineGoal.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCreationMessage(null);
    try {
      const result = await createNewRoutine({
        name: newRoutineName,
        goal: newRoutineGoal,
        isPublic: isPublic,
      });
      console.log(result)
      await handleSetMyRoutinesList(result);
      setCreationMessage("Routine created successfully!");
    } catch (error) {
      setCreationMessage("Routine creation unsuccessful. Please try again");
    } finally {
      reset();
    }
  }

  function reset() {
    setNewRoutineName("");
    setNewRoutineGoal("");
    setIsPublic(false);
  }

  return (
    <div className="CreateRoutine">
      <Form onSubmit={handleSubmit}>
        <span className="close-icon" onClick={handleClose}>
          {" "}
          x{" "}
        </span>
        <Form.Group size="lg" controlId="routineName">
          <Form.Label>Routine Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="name"
            onChange={(e) => setNewRoutineName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="routineGoal">
          <Form.Label>Routine Goal</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            onChange={(e) => setNewRoutineGoal(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="isPublic"
            label="Routine public"
            onChange={(e) =>
              e.target.checked ? setIsPublic(true) : setIsPublic(false)
            }
          />
        </Form.Group>
        {messageDiv}
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          CREATE
        </Button>
      </Form>
    </div>
  );
};

export default CreateRoutine;
