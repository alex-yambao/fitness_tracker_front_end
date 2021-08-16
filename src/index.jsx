import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getCurrentUser } from "./auth";

import { Header, Routines, MyRoutines, Activities } from "./components";

import {
  getActivities,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
} from "./api";

const App = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [myRoutinesList, setMyRoutinesList] = useState([]);
  const [activitiesList, setActivities] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getPublicRoutinesByUser(currentUser.username)
        .then((routines) => {
          setMyRoutinesList(routines);
        })
        .catch((error) => console.error(error));
    }

    getAllPublicRoutines()
      .then((routines) => {
        setPublicRoutines(routines);
      })
      .catch((error) => {
        console.log(error);
      });

    getActivities()
      .then((activities) => {
        setActivities(activities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser]);

  return (
    <Router>
      <div id="App">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        {currentUser ? (
          <>
            <Switch>
              <Route path="/MyRoutines">
                <MyRoutines
                  currentUser={currentUser}
                  myRoutinesList={myRoutinesList}
                  setMyRoutinesList={setMyRoutinesList}
                  activitiesList={activitiesList}
                  setActivities={setActivities}
                />
              </Route>
              <Route path="/Routines">
                <Routines routines={publicRoutines} />
              </Route>
              <Route path="/activities">
                <Activities activities={activitiesList} />
              </Route>
              <Route exact path="/">
                <h2 style={{ padding: ".5em" }}>
                  Welcome, {currentUser.username}
                </h2>
              </Route>
              <Redirect to="/" />
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              <Route path="/Routines">
                <Routines routines={publicRoutines} />
              </Route>
              <Route path="/activities">
                <Activities activities={activitiesList} />
              </Route>
              <Route exact path="/">
                <h2 style={{ padding: ".5em" }}>
                  Please register or log in, above.
                </h2>
              </Route>
              <Redirect to="/" />
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
