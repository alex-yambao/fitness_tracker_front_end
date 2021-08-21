import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UpdateRoutine.css";
import { updateRoutineActivity } from "../api";

const UpdateRoutineActivity = ({ handleClose, count, duration, routineActivityId }) => {
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updatedActivityCount, setUpdatedActivityCount] = useState("");
  const [updatedActivityDuration, setUpdatedActivityDuration] = useState("");

  const messageDiv = updateMessage ? (
    <div className="message">{updateMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return updatedActivityCount.length > 0 && updatedActivityDuration.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateMessage(null);
    try {
      const result = await updateRoutineActivity(
        routineActivityId,
        updatedActivityCount,
        updatedActivityDuration
      );
      console.log(result)
      setUpdateMessage("Routine Activity updated successfully!");
    } catch (error) {
      setUpdateMessage("Routine Activity update unsuccessful. Please try again");
    } finally {
      reset();
    }
  }

  function reset() {
    setUpdatedActivityCount("");
    setUpdatedActivityDuration("");
  }

  return (
    <div className="UpdateRoutine">
      <Form onSubmit={handleSubmit}>
        <span className="close-icon" onClick={handleClose}>
          {" "}
          x{" "}
        </span>
        <Form.Group size="lg" controlId="activityCount">
          <Form.Label>Activity Count</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="count"
            placeholder={count}
            onChange={(e) => setUpdatedActivityCount(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="routineGoal">
          <Form.Label>Activity Duration</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            placeholder={duration}
            onChange={(e) => setUpdatedActivityDuration(e.target.value)}
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

export default UpdateRoutineActivity;