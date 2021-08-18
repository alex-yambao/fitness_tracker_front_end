import React, { useState, useEffect } from "react";
import "./Activities.css";
import Button from "react-bootstrap/Button";
import AddActivity from "./AddActivity";

const Activities = ({ currentUser, activitiesList, handleSetActivitiesList }) => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  

  const toggleShowAddActivity = () => {
    setShowAddActivity(!showAddActivity);
  };
  return currentUser ? (
    <div className="activities">
      <h2>Here are all activities</h2>
      <p>There is a total of {activitiesList.length} activities.</p>  
      <Button variant="primary" onClick={toggleShowAddActivity}>
        Add Activity
      </Button> 

      {showAddActivity && (
        <AddActivity
          handleClose={toggleShowAddActivity}
          handleSetActivitiesList={handleSetActivitiesList}
        />
      )}
      {activitiesList.map(({ id, name, description }) => (
        <div key={id} className="post">
          <h3>Activity Name: {name}</h3>
          <p>Description: {description}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="activities">
      <h2>Here are all activities</h2>
      <p>There is a total of {activitiesList.length} activities.</p>
      {activitiesList.map(({ id, name, description }) => (
        <div key={id} className="post">
          <h3>Activity Name: {name}</h3>
          <p>Description: {description}</p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
