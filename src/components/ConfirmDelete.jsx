import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ConfirmDelete.css";
import { deleteRoutine } from "../api";

const ConfirmDelete = ({
  handleClose,
  handleDeleteRoutine,
  routineId,
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
    e.preventDefault();
    setDeletionMessage(null);
    try {
      const result = await deleteRoutine(routineId);
      if (result) {
        await handleDeleteRoutine(result);
        setDeletionMessage("Routine deleted successfully!");
      }
    } catch (error) {
      console.error(error)
      setDeletionMessage("Routine deletion unsuccessful. Please try again");
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
