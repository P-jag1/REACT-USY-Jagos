import React from "react";
import Recipe from "./Recipe"; 
import recipeStyle from "../css/recipe.module.css"; 
//konstanty
import { RECIPE_DETAIL } from "./constants/RecipeConstants";

function RecipeGridList(props) {
  const { recipeList, cardSize, ingredientsList } = props;

  if (cardSize === RECIPE_DETAIL.LARGE) {
    return recipeList.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} cardSize={cardSize} ingredientsList={ingredientsList} isAuthorized={props.isAuthorized}/>
    ));
  } else {
    return (
      <div className={recipeStyle.recipeGridSmallContainer}>
        {recipeList.map((recipe) => (
            <Recipe recipe={recipe} ingredientsList={ingredientsList} isAuthorized={props.isAuthorized}/>
        ))}
      </div>
    );
  }
}

export default RecipeGridList