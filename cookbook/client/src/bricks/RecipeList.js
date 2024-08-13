import React, { useState } from "react"; 
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";
import recipeStyle from "../css/recipeList.module.css";
//konstanty
import { RECIPE_DETAIL, RECIPE_VIEWS } from "./constants/RecipeConstants";



function RecipeList(props) {
  const [viewType, setViewType] = useState(RECIPE_VIEWS.GRID);
  const isGrid = viewType === RECIPE_VIEWS.GRID;
  const [cardSize, setCardSize] = useState(RECIPE_DETAIL.SMALL);

  function handleViewTypeChange() {
    setViewType((currentState) => {
      if (currentState === RECIPE_VIEWS.GRID) return RECIPE_VIEWS.TABLE;
      else return RECIPE_VIEWS.GRID;
    })
  }

  function handleCardSizeChange() {
      setCardSize((currentState) => {
        if (currentState === RECIPE_DETAIL.SMALL) return RECIPE_DETAIL.LARGE;
        else return RECIPE_DETAIL.SMALL;
      })
  }

  return (
    <div>
      <Navbar>
        <div className="container-fluid">
          <Navbar.Brand>Co Uvařit</Navbar.Brand>
          <div className={recipeStyle.recipeButtonContainer}>
            {isGrid && 
            <Button className={recipeStyle.recipeButton} onClick={handleCardSizeChange}>
              {cardSize === RECIPE_DETAIL.LARGE ? "Malé Recepty" : "Velké Recepty"}
            </Button>}
            <Button className={recipeStyle.recipeButton} onClick={handleViewTypeChange}>
              <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} /> {" "}
              {isGrid ? "Tabulka" : "Seznam"}
            </Button>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
        <RecipeGridList recipeList={props.recipeList} cardSize={cardSize}/>
      ) : (
        <RecipeTableList recipeList={props.recipeList} />
      )}
    </div>
  );
}

export default RecipeList;