import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addActivityToRoutine } from "../api";
import "./CreateRoutine.css";

const AddRoutineActivity = ({ routineId, activitiesList, handleClose }) => {
  const [activityId, setActivityId] = useState(1);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await addActivityToRoutine({
        routineId,
        activityId,
        duration,
        count,
      });
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  function validateForm() {
    return activityId.length > 0 && count.length > 0 && duration.length > 0;
  }

  function handleChange(e) {
    return setActivityId(e.target.value);
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
        <Form.Group size="lg" controlId="routineActivity">
          <Form.Label>Select Activity</Form.Label>
          <select
            id="activityOption"
            name="activityOption"
            onChange={handleChange}
          >
            <option value="option">Select an Activity...</option>
            {activitiesList.map((activity) => {
              return <option value={activity.id}>{activity.name}</option>;
            })}
          </select>
        </Form.Group>
        <Form.Group size="lg" controlId="ActivityCount">
          <Form.Label>Activity Count</Form.Label>
          <Form.Control
            type="text"
            name="count"
            onChange={(e) => setCount(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ActivityDuration">
          <Form.Label>Activity Duration</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          ADD ACTIVITY
        </Button>
      </Form>
    </div>
  );
};

export default AddRoutineActivity;
