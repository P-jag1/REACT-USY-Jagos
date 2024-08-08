import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import recipeStyle from "../css/recipe.module.css";
import placeholderImg from '../img/placeholderImg.jpg';
import Icon from "@mdi/react";
import { mdiChefHat, mdiStove } from "@mdi/js";

function Recipe(props) {
    return (
      <Card className={recipeStyle.recipe}>
        <Card.Img className={recipeStyle.recipeImg} src={props.recipe.imgUri}
            onError={(e) => {
             e.target.onerror = null;
             e.target.src = placeholderImg;
        }}/>
        <Card.Body className={recipeStyle.recipeBody}>
          <Card.Title className={recipeStyle.recipeName}>
            <Icon path={mdiChefHat} size={0.95} color="grey" />{" "}
            {props.recipe.name}
          </Card.Title>
          <Card.Text className={recipeStyle.recipeDescription}>
            <Icon path={mdiStove} size={0.75} color="grey" />{" "}
            {props.recipe.description}
          </Card.Text>  
          <Button className={recipeStyle.recipeButton}>
            Více...
          </Button>  
        </Card.Body>
      </Card>
    );
  }

export default Recipe;