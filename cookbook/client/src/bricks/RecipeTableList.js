import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import RecipeForm from "./RecipeForm";
import RecipeDelete from "./RecipeDelete";
import tableStyles from "../css/recipeTableList.module.css";

function RecipeTableList(props) {
  const [isEditRecipe, setEditRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setEditRecipe(true);
  };

  const handleDeleteRecipe = (recipeId) => {
    props.onDelete(recipeId);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID Receptu</th>
            <th>Název Receptu</th>
            <th>Popis Přípravy</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {props.recipeList.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td className={tableStyles.recipeTableDescription}>{recipe.description}</td>
              <td>
                <Button className={tableStyles.tableRecipeButton} onClick={() => handleEditRecipe(recipe)}>
                  <Icon className={tableStyles.tableIcon} path={mdiPencil} size={1} />
                </Button>
                <RecipeDelete recipeId={recipe.id} onDelete={props.handleDeleteRecipe} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isEditRecipe && selectedRecipe && (
        <RecipeForm
          setNewRecipe={setEditRecipe}
          recipe={selectedRecipe}
          isEditRecipe={isEditRecipe}
          ingredientsList={props.ingredientsList}
          onComplete={props.handleUpdateRecipe}
        />
      )}
    </>
  );
}

export default RecipeTableList;
