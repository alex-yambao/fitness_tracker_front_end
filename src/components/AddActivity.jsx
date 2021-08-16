import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addActivityToRoutine } from "../api";

const AddActivity = ({ routineId, activitiesList }) => {
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await addActivityToRoutine(
        routineId,
        activityId,
        duration,
        count,
      );
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    return setActivityId(event.target.value);
  }

  return (
    <form
      className="activity-update-form"
      id={routineId}
      onSubmit={handleSubmit}
    >
      <label for="activityOption">Add an Activity to this Routine:</label>
      <select id="activityOption" name="activityOption" onChange={handleChange}>
        <option value="option">Select an Activity...</option>
        {activitiesList.map((activity) => {
          return <option value={activity.id}>{activity.name}</option>;
        })}
      </select>
      <label for="count">Count:</label>
      <input
        type="text"
        id="countOption"
        name="count"
        onChange={(e) => {
          setCount(e.target.value);
        }}
      ></input>
      <label for="duration">Duration:</label>
      <input
        type="text"
        id="durationOption"
        name="duration"
        onChange={(e) => {
          setDuration(e.target.value);
        }}
      ></input>
      <button>Submit</button>
    </form>
  );
};

export default AddActivity;
