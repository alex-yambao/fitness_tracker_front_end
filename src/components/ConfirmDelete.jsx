import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ConfirmDelete.css";
import { deleteRoutine } from "../api";

const ConfirmDelete = ({
  handleClose,
  routineId,
  setMyRoutinesList,
  myRoutinesList,
}) => {
  const [deletionMessage, setDeletionMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const messageDiv = deletionMessage ? (
    <div className="message">{deletionMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return confirmDelete === true;
  }

  async function handleSubmit(e) {
    setDeletionMessage(null);
    try {
      const result = await deleteRoutine(routineId);
      setMyRoutinesList(myRoutinesList);
      setDeletionMessage("Routine deleted successfully!");
    } catch (error) {
      setDeletionMessage("Routine deletion unsuccessful. Please try again");
    } finally {
      e.target.reset();
    }
  }

  return (
    <div className="ConfirmDelete">
      <Form onSubmit={handleSubmit}>
        <span className="close-icon" onClick={handleClose}>
          {" "}
          x{" "}
        </span>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="isPublic"
            label="Confirm Deletion"
            onChange={(e) =>
              e.target.checked
                ? setConfirmDelete(true)
                : setConfirmDelete(false)
            }
          />
        </Form.Group>
        {messageDiv}
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          CONFIRM DELETION
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmDelete;
