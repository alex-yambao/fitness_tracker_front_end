import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getCurrentUser, clearCurrentUser, storeCurrentUser } from "./auth";
import { getActivities } from "./api";
import { Header, Routines, MyRoutines, Activities } from "./components";

const App = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activitiesList, setActivities] = useState([]);
  useEffect(() => {
    getActivities()
      .then((activities) => {
        setActivities(activities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser("");
  };

  async function handleLogin({ user }) {
    await storeCurrentUser(user);
    await setCurrentUser(user);
  }

  return (
    <Router>
      <div id="App">
        <Header
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
        {currentUser ? (
          <>
            <Switch>
              <Route path="/MyRoutines">
                <MyRoutines
                  currentUser={currentUser}
                  activitiesList={activitiesList}
                />
              </Route>
              <Route path="/Routines">
                <Routines />
              </Route>
              <Route path="/activities">
                <Activities
                  activitiesList={activitiesList}
                  setActivities={setActivities}
                />
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
                <Routines />
              </Route>
              <Route path="/activities">
                <Activities activitiesList={activitiesList} />
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
