import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UpdateRoutine.css";
import { updateRoutine } from "../api";

const UpdateRoutine = ({
  handleClose,
  setMyRoutinesList,
  myRoutinesList,
  routineId,
  goal,
  name,
}) => {
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updatedRoutineName, setUpdatedRoutineName] = useState("");
  const [updatedRoutineGoal, setUpdatedRoutineGoal] = useState("");

  const messageDiv = updateMessage ? (
    <div className="message">{updateMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return !updatedRoutineName.length > 0 && !updatedRoutineGoal.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateMessage(null);
    try {
      const result = await updateRoutine({
        routineId: routineId,
        name: updatedRoutineName,
        goal: updatedRoutineGoal,
      });
      setMyRoutinesList(myRoutinesList);
      setUpdateMessage("Routine updated successfully!");
    } catch (error) {
      setUpdateMessage("Routine update unsuccessful. Please try again");
    }
  }

  function reset() {
    setUpdatedRoutineName("");
    setUpdatedRoutineGoal("");
  }

  return (
    <div className="UpdateRoutine">
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
            value={name}
            onChange={(e) => setUpdatedRoutineName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="routineGoal">
          <Form.Label>Routine Goal</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setUpdatedRoutineGoal(e.target.value)}
          />
        </Form.Group>
        {messageDiv}
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          UPDATE
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRoutine;
