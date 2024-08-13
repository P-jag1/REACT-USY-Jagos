import React from "react";
import Recipe from "./Recipe"; // Import komponenty Recipe

function RecipeGridList(props) {
  const { recipeList, cardSize } = props;

  return props.recipeList.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} cardSize={cardSize} />
      )
  );
}

export default RecipeGridList