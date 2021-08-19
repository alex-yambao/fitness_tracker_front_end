import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { getAllRoutinesByUser } from "../api";
import CreateRoutine from "./CreateRoutine";
import MyRoutinesCard from "./MyRoutinesCard";
import AddRoutineActivity from "./AddRoutineActivity";
import "./MyRoutines.css";

const MyRoutines = ({ currentUser, activitiesList }) => {
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [showUpdateRoutine, setShowUpdateRoutine] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddRoutineActivity, setShowAddRoutineActivity] = useState(false);
  const [myRoutinesList, setMyRoutinesList] = useState([]);

  useEffect(() => {
    getAllRoutinesByUser(currentUser.username)
      .then((routines) => {
        setMyRoutinesList(routines);
      })
      .catch((error) => console.error(error));
  }, myRoutinesList);

  async function handleSetMyRoutinesList(result) {
    setMyRoutinesList([...myRoutinesList, result]);
  }

  async function handleUpdateRoutine(result) {
    setMyRoutinesList([
      myRoutinesList.filter((routine) => routine.id !== result.id),
      result,
    ]);
  }

  async function handleDeleteRoutine(result) {
    setMyRoutinesList(
      myRoutinesList.filter((routine) => routine.id !== result.id)
    );
  }

  const toggleShowCreateRoutine = () => {
    setShowCreateRoutine(!showCreateRoutine);
  };

  const toggleShowUpdateRoutine = () => {
    setShowUpdateRoutine(!showUpdateRoutine);
  };

  const toggleConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };

  const toggleShowActivity = () => {
    setShowAddRoutineActivity(!showAddRoutineActivity);
  };

  return (
    <div className="routines">
      <h2>
        Hello {currentUser.username}, here are your Routines &nbsp;|&nbsp;{" "}
        <Button variant="primary" onClick={toggleShowCreateRoutine}>
          Create Routine
        </Button>
        {showCreateRoutine && (
          <CreateRoutine
            handleClose={toggleShowCreateRoutine}
            handleSetMyRoutinesList={handleSetMyRoutinesList}
          />
        )}
      </h2>
      <p>There is a total of {myRoutinesList.length} routines.</p>
      {myRoutinesList.map((routine, RoutineIndex) => {
        const { id, name, goal, creatorName, activities } = routine;
        return (
          <MyRoutinesCard
            toggleShowUpdateRoutine={toggleShowUpdateRoutine}
            showUpdateRoutine={showUpdateRoutine}
            handleUpdateRoutine={handleUpdateRoutine}
            toggleConfirmDelete={toggleConfirmDelete}
            showConfirmDelete={showConfirmDelete}
            handleDeleteRoutine={handleDeleteRoutine}
            id={id}
            name={name}
            goal={goal}
            creatorName={creatorName}
            activities={activities}
            RoutineIndex={RoutineIndex}
            activitiesList={activitiesList}
            setShowAddRoutineActivity={setShowAddRoutineActivity}
            showAddRoutineActivity={showAddRoutineActivity}
            AddRoutineActivity={AddRoutineActivity}
            toggleShowActivity={toggleShowActivity}
          />
        );
      })}
    </div>
  );
};

export default MyRoutines;
