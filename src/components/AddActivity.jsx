import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateRoutine.css";
import { createActivity } from "../api";

const AddRoutineActivity = ({ handleClose, handleSetActivitiesList }) => {
  const [addMessage, setAddMessage] = useState(null);
  const [addRoutineActivityName, setAddRoutineActivityName] = useState("");
  const [activityDescription, setAddRoutineActivityDescription] = useState("");

  const messageDiv = addMessage ? (
    <div className="message">{addMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return addRoutineActivityName.length > 0 && activityDescription.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAddMessage(null);
    try {
      const result = await createActivity(addRoutineActivityName, activityDescription);
      await handleSetActivitiesList(result);
      setAddMessage("Activity created successfully!");
    } catch (error) {
      setAddMessage("Activity creation unsuccessful. Please try again");
    } finally {
      reset();
    }
  }

  function reset() {
    setAddRoutineActivityName("");
    setAddRoutineActivityDescription("");
  }

  return (
    <div className="CreateRoutine">
      <Form onSubmit={handleSubmit}>
        <span className="close-icon" onClick={handleClose}>
          {" "}
          x{" "}
        </span>
        <Form.Group size="lg" controlId="routineName">
          <Form.Label>Activity Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="name"
            onChange={(e) => setAddRoutineActivityName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="routineGoal">
          <Form.Label>Activity Description</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            onChange={(e) => setAddRoutineActivityDescription(e.target.value)}
          />
        </Form.Group>
        {messageDiv}
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          ADD
        </Button>
      </Form>
    </div>
  );
};

export default AddRoutineActivity;
