import React, { useState, useEffect } from "react";

import "./Activities.css";

const Activities = ({ activitiesList, setActivities }) => {
  return (
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
