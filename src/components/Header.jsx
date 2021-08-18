import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Header = ({ handleLogin, handleLogout, currentUser }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <header>
      <h1>Fitness Tracker</h1>
      <div className="user-select">
        {currentUser ? (
          <>
            <NavLink to="/myroutines" activeClassName="current">
              My Routines
            </NavLink>
            <NavLink to="/routines" activeClassName="current">
              Routines
            </NavLink>
            <NavLink to="/activities" activeClassName="current">
              Activities
            </NavLink>
            <button
              name="logout"
              type="submit"
              value="logout"
              onClick={handleLogout}
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <NavLink to="/routines" activeClassName="current">
              Routines
            </NavLink>
            <NavLink to="/activities" activeClassName="current">
              Activities
            </NavLink>
            <button
              name="register"
              type="submit"
              value="register"
              onClick={toggleShowRegister}
            >
              REGISTER
            </button>
            {showRegister && (
              <Register
                handleClose={toggleShowRegister}
                handleLogin={handleLogin}
              />
            )}

            <button
              name="login"
              type="button"
              value="login"
              onClick={toggleShowLogin}
            >
              LOG IN
            </button>
            {showLogin && (
              <Login handleClose={toggleShowLogin} handleLogin={handleLogin} />
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
