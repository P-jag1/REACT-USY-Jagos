import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import deleteStyles from "../css/deleteRecipe.module.css";
import DeleteConfirm from "./DeleteConfirm";

import { STATE, REQUEST_TYPE, API_URLS } from "../bricks/constants/ServerRequestStates";

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
    if (deleteCall.state === STATE.PENDING) return;

    setDeleteCall({ state: STATE.PENDING });

    try {
      const res = await fetch(API_URLS.RECIPE_DELETE, {
        method: REQUEST_TYPE.POST,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: recipeId })
      });

      const data = await res.json();

      if (res.status >= 400) {
        setDeleteCall({ state: STATE.ERROR, error: data });
        if (typeof onError === 'function') {
          onError(data.errorMessage);
        }
      } else {
        setDeleteCall({ state: STATE.SUCCESS });
        if (typeof onDelete === 'function') {
          onDelete(recipeId);
        }
      }
    } catch (error) {
      setDeleteCall({ state: STATE.ERROR, error: error.message });
      if (typeof onError === 'function') {
        onError(error.message);
      }
    }
  };

  return (
  <>
    <Button className={deleteStyles.deleteRecipeButton}  onClick={(e) => { e.preventDefault(); handleShowConfirmation();}} disabled={deleteCall.state === STATE.PENDING}>
        <Icon className={deleteStyles.deleteIcon} path={mdiTrashCanOutline} size={0.85} />
    </Button>

    <DeleteConfirm show={showConfirmation} onHide={handleCancelConfirmation} onConfirm={handleDelete}/>
  </>
  );
}