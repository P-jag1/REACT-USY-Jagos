import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import deleteStyles from "../css/deleteRecipe.module.css";
import DeleteConfirm from "./DeleteConfirm";

export default function RecipeDelete({ recipeId, onDelete, onError }) {
  const [deleteCall, setDeleteCall] = useState({ state: 'inactive' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleDelete = async () => {
    setShowConfirmation(false);
    if (deleteCall.state === 'pending') return;

    setDeleteCall({ state: 'pending' });

    try {
      const res = await fetch(`http://localhost:3000/recipe/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: recipeId })
      });

      const data = await res.json();

      if (res.status >= 400) {
        setDeleteCall({ state: 'error', error: data });
        if (typeof onError === 'function') {
          onError(data.errorMessage);
        }
      } else {
        setDeleteCall({ state: 'success' });
        if (typeof onDelete === 'function') {
          onDelete(recipeId);
        }
      }
    } catch (error) {
      setDeleteCall({ state: 'error', error: error.message });
      if (typeof onError === 'function') {
        onError(error.message);
      }
    }
  };

  return (
  <>
    <Button className={deleteStyles.deleteRecipeButton}  onClick={(e) => { e.preventDefault(); handleShowConfirmation();}} disabled={deleteCall.state === 'pending'}>
        <Icon className={deleteStyles.deleteIcon} path={mdiTrashCanOutline} size={1} />
    </Button>

    <DeleteConfirm show={showConfirmation} onHide={handleCancelConfirmation} onConfirm={handleDelete}/>
  </>
  );
}