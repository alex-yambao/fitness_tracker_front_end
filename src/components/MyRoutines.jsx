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
  const [showConfirmDeleteActivity, setConfirmDeleteActivity] = useState(false)
  const [showUpdateRoutineActivity, setShowUpdateRoutineActivity] = useState(false)

  showConfirmDeleteActivity
  useEffect(() => {
    getAllRoutinesByUser(currentUser.username)
      .then( async (routines) => {
       setMyRoutinesList(routines);
      })
      .catch((error) => console.error(error));
  }, []);

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

  const toggleShowAddActivity = () => {
    setShowAddRoutineActivity(!showAddRoutineActivity);
  };

  function toggleConfirmDeleteActivity() {
    setConfirmDeleteActivity(!showConfirmDeleteActivity);
  }

  function toggleShowUpdateRoutineActivity() {
    setShowUpdateRoutineActivity(!showUpdateRoutineActivity);
  }

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
            showAddRoutineActivity={showAddRoutineActivity}
            AddRoutineActivity={AddRoutineActivity}
            toggleShowAddActivity={toggleShowAddActivity}
            toggleConfirmDeleteActivity={toggleConfirmDeleteActivity}
            showConfirmDeleteActivity={showConfirmDeleteActivity}
            toggleShowUpdateRoutineActivity={toggleShowUpdateRoutineActivity}
            showUpdateRoutineActivity={showUpdateRoutineActivity}
          />
        );
      })}
    </div>
  );
};

export default MyRoutines;
