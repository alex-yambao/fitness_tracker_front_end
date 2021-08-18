import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { loginUser } from "../api";
import { storeCurrentUser } from "../auth";

const Login = ({ handleClose, setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(null);

  const messageDiv = loginMessage ? (
    <div className="message">{loginMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoginMessage(null);
    try {
      const result = await loginUser(username, password);
      if (result.user) {
        handleLogin(result);
        setLoginMessage(result.message);
      }
    } catch (error) {
      setLoginMessage("Username or Password Invalid.");
    }
  }

  async function handleLogin(result) {
    await storeCurrentUser(result.user);
    await setCurrentUser(result.user);
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <span className="close-icon" onClick={handleClose}>
          {" "}
          x{" "}
        </span>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {messageDiv}
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
