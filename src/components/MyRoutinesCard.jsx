import React, { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import UpdateRoutine from "./UpdateRoutine";
import Button from "react-bootstrap/Button";

const MyRoutinesCard = ({
  toggleShowUpdateRoutine,
  showUpdateRoutine,
  setMyRoutinesList,
  myRoutinesList,
  toggleConfirmDelete,
  showConfirmDelete,
  id,
  name,
  goal,
  creatorName,
  RoutineIndex,
  activities,
  activitiesList,
  toggleShowActivity,
  showAddActivity,
  AddActivity,
}) => {
  const { RoutineActivityList, setRoutineActivity } = useState("");

  return (
    <div key={RoutineIndex} className="post">
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
          routinesListIndex={routinesListIndex}
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
          {activities.map((activity, ActivityIndex) => {
            const { id, name, description, duration, count } = activity;
            setRoutineActivity({ activity });

            return (
              <div key={ActivityIndex} className="activities">
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
          })}{" "}
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
};

export default MyRoutinesCard;