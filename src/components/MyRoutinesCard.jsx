import React, { useEffect, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import UpdateRoutine from "./UpdateRoutine";
import Button from "react-bootstrap/Button";
import AddRoutineActivity from "./AddRoutineActivity";
import ConfirmDeleteActivity from "./ConfirmDeleteActivity";
import UpdateRoutineActivity from "./UpdateRoutineActivity";

const MyRoutinesCard = ({
  toggleShowUpdateRoutine,
  showUpdateRoutine,
  handleUpdateRoutine,
  toggleConfirmDelete,
  showConfirmDelete,
  handleDeleteRoutine,
  id,
  name,
  goal,
  creatorName,
  RoutineIndex,
  activities,
  activitiesList,
  toggleShowAddActivity,
  showAddRoutineActivity,
  toggleConfirmDeleteActivity,
  showConfirmDeleteActivity,
  toggleShowUpdateRoutineActivity,
  showUpdateRoutineActivity
}) => {
  return (
    <div key={RoutineIndex} className="post">
      <h3>Routine Name: {name} </h3> &nbsp;
      <Button variant="primary" onClick={toggleShowUpdateRoutine}>
        Update Routine
      </Button>
      {showUpdateRoutine && (
        <UpdateRoutine
          handleClose={toggleShowUpdateRoutine}
          handleUpdateRoutine={handleUpdateRoutine}
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
          handleDeleteRoutine={handleDeleteRoutine}
          routineId={id}
          RoutineIndex={RoutineIndex}
        />
      )}
      <p>Routine Goal: {goal}</p>
      <p>Creator Name: {creatorName}</p>
      {activities && activities.length > 0 ? (
        <>
          {activities.map((activity, ActivityIndex) => {
            const { id, name, description, duration, count, routineActivityId } = activity;
            return (
              <div key={ActivityIndex} className="activities">
                &nbsp;
                <Button variant="primary" onClick={toggleShowAddActivity}>
                  [+] Activity
                </Button>
                {showAddRoutineActivity && (
                  <AddRoutineActivity
                    handleClose={toggleShowAddActivity}
                    routineId={id}
                    activitiesList={activitiesList}
                  />
                )}
                <h3>Routine Activity: {name}</h3>
                <p>Activity Description: {description}</p>
                <p>Duration: {duration}</p>
                <p>Count: {count}</p>
                &nbsp;|&nbsp;{" "}
                <Button variant="primary" onClick={toggleConfirmDeleteActivity}>
                  (-) Activity
                </Button>
                {showConfirmDeleteActivity && (
                  <ConfirmDeleteActivity
                    handleClose={toggleConfirmDeleteActivity}
                    handleDeleteRoutine={handleDeleteRoutine}
                    routineActivityId={routineActivityId}
                  />
                )}
                &nbsp;|&nbsp;
                <Button
                  variant="primary"
                  key={id}
                  onClick={toggleShowUpdateRoutineActivity}
                >
                  Update Activity
                </Button>
                {showUpdateRoutineActivity && (
                  <UpdateRoutineActivity
                    handleClose={toggleShowUpdateRoutineActivity}
                    count={count}
                    duration={duration}
                    routineActivityId={routineActivityId}
                  />
                )}
              </div>
            );
          })}{" "}
        </>
      ) : (
        <>
          &nbsp;
          <Button variant="primary" onClick={toggleShowAddActivity}>
            [+] Activity
          </Button>
          {showAddRoutineActivity && (
            <AddRoutineActivity
              handleClose={toggleShowAddActivity}
              activitiesList={activitiesList}
              routineId={id}
            />
          )}
          <p>There are 0 Activities</p>{" "}
        </>
      )}
    </div>
  );
};

export default MyRoutinesCard;
