import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { registerUser } from "../api";

const Register = ({ handleClose, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState(null);

  const messageDiv = registerMessage ? (
    <div className="message">{registerMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setRegisterMessage(null);
    try {
      const result = await registerUser(username, password);
      await handleLogin(result);
      setRegisterMessage(result.message);
    } catch (error) {
      setRegisterMessage("Registration Unsuccessful");
    }
  }

  return (
    <div className="Register">
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
          REGISTER
        </Button>
      </Form>
    </div>
  );
};

export default Register;
