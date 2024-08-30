import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import recipeStyle from "../css/recipe.module.css";
import placeholderImg from '../img/placeholderImg.jpg';
import RecipeForm from './RecipeForm';
import RecipeDelete from './RecipeDelete';
import Icon from "@mdi/react";
import { mdiChefHat, mdiStove } from "@mdi/js";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//konstanty
import { RECIPE_DETAIL } from "./constants/RecipeConstants";

function Recipe(props) {
  const [isEditRecipe, setEditRecipe] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/recipeDetail/${props.recipe.id}`);
  };

  const handleEditRecipe = () => setEditRecipe(true);

    return (
      <>
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
          {props.cardSize === RECIPE_DETAIL.LARGE && (
            <>
              <Button className={recipeStyle.recipeButton} onClick={handleRedirect}>
                Více...
              </Button>
              {props.isAuthorized && (
                <>
                  <Button className={recipeStyle.recipeButton} onClick={handleEditRecipe}>
                    Upravit
                  </Button>
                  <RecipeDelete recipeId={props.recipe.id} onDelete={props.handleDeleteRecipe} />
                </>
              )}
            </>
          )}
        </Card.Body>
        {props.cardSize !== RECIPE_DETAIL.LARGE && (
        <Card.Footer>
        <Button className={recipeStyle.recipeButton} onClick={handleRedirect}>
            Více...
          </Button> 
          {props.isAuthorized && (
          <>
            <Button className={recipeStyle.recipeButton} onClick={handleEditRecipe}>
              Upravit
            </Button> 
            <RecipeDelete recipeId={props.recipe.id} onDelete={props.handleDeleteRecipe} /> 
          </>
          )} 
        </Card.Footer>)}
      </Card>

      {isEditRecipe && (
        <RecipeForm
        setNewRecipe={setEditRecipe}
        recipe={props.recipe}
        isEditRecipe={isEditRecipe}
        ingredientsList={props.ingredientsList}
        onComplete={props.handleUpdateRecipe}
        />
      )}
      </>
    );
  }

export default Recipe;