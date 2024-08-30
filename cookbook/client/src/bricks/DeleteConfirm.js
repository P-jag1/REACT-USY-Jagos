import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import deleteStyles from "../css/deleteRecipe.module.css";

const DeleteConfirm = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="sm" className={deleteStyles.modalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Smazat Recept</Modal.Title>
      </Modal.Header>
      <Modal.Body>Opravdu chcete smazat recept?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;