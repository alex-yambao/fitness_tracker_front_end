import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { getAllRoutinesByUser } from "../api";
import CreateRoutine from "./CreateRoutine";
import UpdateRoutine from "./UpdateRoutine";
import ConfirmDelete from "./ConfirmDelete";
import AddActivity from "./AddActivity";
import "./MyRoutines.css";

const MyRoutines = ({ currentUser, activitiesList, setActivities }) => {
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [showUpdateRoutine, setShowUpdateRoutine] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [myRoutinesList, setMyRoutinesList] = useState([]);

  useEffect(() => {
    getAllRoutinesByUser(currentUser.username)
      .then((routines) => {
        setMyRoutinesList(routines);
      })
      .catch((error) => console.error(error));
  }, [currentUser]);

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
    setShowAddActivity(!showAddActivity);
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
            setMyRoutinesList={setMyRoutinesList}
            myRoutinesList={myRoutinesList}
          />
        )}
      </h2>

      <p>There is a total of {myRoutinesList.length} routines.</p>

      {myRoutinesList.map((routine, index) => {
        const { id, name, goal, creatorName, activities } = routine;
        return (
          <div key={index} className="post">
            <h3>Routine Name: {name} </h3> &nbsp;
            <Button variant="primary" onClick={toggleShowUpdateRoutine}>
              Update Routine
            </Button>
            {showUpdateRoutine && (
              <UpdateRoutine
                handleClose={toggleShowUpdateRoutine}
                setMyRoutinesList={setMyRoutinesList}
                myRoutinesList={myRoutinesList}
                routineId={id}
                name={name}
                goal={goal}
              />
            )}
            &nbsp;|&nbsp;{" "}
            <Button variant="primary" onClick={toggleConfirmDelete}>
              Delete
            </Button>
            {showConfirmDelete && (
              <ConfirmDelete
                handleClose={toggleConfirmDelete}
                setMyRoutinesList={setMyRoutinesList}
                myRoutinesList={myRoutinesList}
                routineId={id}
                routinesListIndex={index}
              />
            )}
            <p>Routine Goal: {goal}</p>
            <p>Creator Name: {creatorName}</p>
            {activities.length > 0 ? (
              <>
                &nbsp;
                <Button variant="primary" onClick={toggleConfirmDelete}>
                  [+] Activity
                </Button>
                {showAddActivity && (
                  <AddActivity
                    handleClose={toggleConfirmDelete}
                    routineId={id}
                    activitiesList={activitiesList}
                  />
                )}
                {activities.map(
                  ({ id, name, description, duration, count }) => {
                    setRoutineActivity({ activity });

                    return (
                      <div key={id} className="activities">
                        <h3>Routine Activity: {name}</h3>
                        <p>Activity Description: {description}</p>
                        <p>Duration: {duration}</p>
                        <p>Count: {count}</p>
                        &nbsp;|&nbsp;{" "}
                        <Button
                          variant="primary"
                          key={id}
                          onClick={toggleConfirmDelete}
                        >
                          (-) Activity
                        </Button>
                        &nbsp;|&nbsp;{" "}
                        <Button
                          variant="primary"
                          key={id}
                          onClick={toggleConfirmDelete}
                        >
                          Update Activity
                        </Button>
                      </div>
                    );
                  }
                )}{" "}
              </>
            ) : (
              <>
                &nbsp;
                <Button variant="primary" onClick={toggleShowActivity}>
                  [+] Activity
                </Button>
                {showAddActivity && (
                  <AddActivity activitiesList={activitiesList} routineId={id} />
                )}{" "}
                <p>There are 0 Activities</p>{" "}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyRoutines;
