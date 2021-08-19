import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UpdateRoutine.css";
import { updateRoutine } from "../api";

const UpdateRoutine = ({ handleClose, handleUpdateRoutine, routineId, goal, name }) => {
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updatedRoutineName, setUpdatedRoutineName] = useState("");
  const [updatedRoutineGoal, setUpdatedRoutineGoal] = useState("");

  const messageDiv = updateMessage ? (
    <div className="message">{updateMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return updatedRoutineName.length > 0 && updatedRoutineGoal.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateMessage(null);
    try {
      const result = await updateRoutine(
        routineId,
        updatedRoutineName,
        updatedRoutineGoal
      );
      await handleUpdateRoutine(result);
      setUpdateMessage("Routine updated successfully!");
    } catch (error) {
      setUpdateMessage("Routine update unsuccessful. Please try again");
    } finally {
      reset();
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
            placeholder={name}
            onChange={(e) => setUpdatedRoutineName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="routineGoal">
          <Form.Label>Routine Goal</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            placeholder={goal}
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
