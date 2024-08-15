import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import recipeStyle from "../css/recipe.module.css";
import placeholderImg from '../img/placeholderImg.jpg';
import Icon from "@mdi/react";
import { mdiChefHat, mdiStove } from "@mdi/js";
//konstanty
import { RECIPE_DETAIL } from "./constants/RecipeConstants";

function Recipe(props) {
    return (
      <Card className={props.cardSize === RECIPE_DETAIL.LARGE ? recipeStyle.recipeLarge : recipeStyle.recipeSmall}>
        <Card.Img className={props.cardSize === RECIPE_DETAIL.LARGE ? recipeStyle.recipeImgLarge : recipeStyle.recipeImgSmall} src={props.recipe.imgUri}
            onError={(e) => {
             e.target.onerror = null;
             e.target.src = placeholderImg;
        }}/>
        <Card.Body className={recipeStyle.recipeBody}>
          <Card.Title className={recipeStyle.recipeName}>
            <Icon path={mdiChefHat} size={0.95} color="grey" />{" "}
            {props.recipe.name}
          </Card.Title>
          <Card.Text className={props.cardSize === RECIPE_DETAIL.LARGE ? recipeStyle.recipeLargeDescription: recipeStyle.recipeSmallDescription}>
            <Icon path={mdiStove} size={0.75} color="grey" />{" "}
            {props.recipe.description}
          </Card.Text> 
          {props.cardSize !== RECIPE_DETAIL.LARGE && (
          <Card.Text className={recipeStyle.recipeIngredientsSmall}> 
              <ul>
                {props.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {props.ingredientsList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                  </li>
                ))}
              </ul>
          </Card.Text>   
           )}  
          <Button className={recipeStyle.recipeButton}>
            Více...
          </Button>  
        </Card.Body>
      </Card>
    );
  }

export default Recipe;