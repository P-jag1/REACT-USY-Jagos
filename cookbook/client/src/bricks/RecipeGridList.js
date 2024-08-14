import React from "react";
import Recipe from "./Recipe"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
//konstanty
import { RECIPE_DETAIL } from "./constants/RecipeConstants";

function RecipeGridList(props) {
  const { recipeList, cardSize } = props;

  if (cardSize === RECIPE_DETAIL.LARGE) {
    return recipeList.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} cardSize={cardSize} />
    ));
  } else {
    return (
      <div className="row">
        {recipeList.map((recipe) => (
          <div key={recipe.id} className="col-md-3">
            <Recipe recipe={recipe} />
          </div>
        ))}
      </div>
    );
  }
}

export default RecipeGridList