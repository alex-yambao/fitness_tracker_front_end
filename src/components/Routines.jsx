import React from "react";
import { useState, useEffect } from "react";
import "./Routines.css";
import { getAllPublicRoutines } from "../api";

const Routines = () => {
  const [publicRoutines, setPublicRoutines] = useState([]);

  useEffect(() => {
    getAllPublicRoutines()
      .then((routines) => {
        setPublicRoutines(routines);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="Routines">
      <h2>Here are all public routines with their activities</h2>
      <p>There is a total of {publicRoutines.length} public routines.</p>

      {publicRoutines.map(({ id, name, goal, creatorName, activities }) => (
        <div key={id} className="post">
          <h3>Routine Name: {name}</h3>
          <p>Routine Goal: {goal}</p>
          <p>Creator Name: {creatorName}</p>

          {activities.map(({ id, name, description, duration, count }) => (
            <div key={id} className="activities">
              <h3>Routine Activity: {name}</h3>
              <p>Activity Description: {description}</p>
              <p>Duration: {duration}</p>
              <p>Count: {count}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Routines;
