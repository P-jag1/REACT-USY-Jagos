import React, { useState, useMemo } from "react"; 
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import RecipeForm from "./RecipeForm";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";
import { useMediaQuery } from 'react-responsive';
import recipeStyle from "../css/recipeList.module.css";
import { Navbar, Form, Button } from 'react-bootstrap';
//konstanty
import { RECIPE_DETAIL, RECIPE_VIEWS } from "./constants/RecipeConstants";



function RecipeList(props) {
  const [viewType, setViewType] = useState(RECIPE_VIEWS.GRID);
  const [cardSize, setCardSize] = useState(RECIPE_DETAIL.SMALL);
  const [searchBy, setSearchBy] = useState("");
  const [newRecipe, setNewRecipe] = useState(false);

  //const pro view
  const isPhone = useMediaQuery({ query: '(max-width: 500px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isGrid = isTablet ? true : viewType === RECIPE_VIEWS.GRID;


  const filteredRecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, props.recipeList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

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

  const handleNewRecipe = () => setNewRecipe(true);

  return (
    <div>
      <Navbar expand="lg" className={recipeStyle.navbarList}>
        <div className="container-fluid">
          <Navbar.Brand className={recipeStyle.title} >Seznam Receptů</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" ><span>+</span></ Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className={recipeStyle.navbarCollapse}>
          <div>
           <Form className={recipeStyle.recipeButtonContainer} onSubmit={handleSearch}>
              <Form.Control id={"searchInput"} style={{ maxWidth: "200px" }} type="search" placeholder="Hledat Recept" aria-label="Hledat Recept" onChange={handleSearchDelete}/>
              <Button className={recipeStyle.recipeButton} variant="outline-success" type="submit">
                  <Icon className={recipeStyle.icon} size={1} path={mdiMagnify} />
              </Button>
              {props.isAuthorized &&
              <Button className={recipeStyle.recipeButton} onClick={handleNewRecipe}>
                Nový Recept
              </Button>
              }
              {!isPhone && (
                <>
                  {isGrid && 
                    <Button className={recipeStyle.recipeButton} onClick={handleCardSizeChange}>
                      {cardSize === RECIPE_DETAIL.LARGE ? "Malé Recepty" : "Velké Recepty"}
                    </Button>
                  }
                  {!isTablet && props.isAuthorized && 
                    <Button className={recipeStyle.recipeButton} onClick={handleViewTypeChange}>
                      <Icon className={recipeStyle.icon} size={1} path={isGrid ? mdiTable : mdiViewGridOutline} /> {" "}
                      {isGrid ? "Tabulka" : "Seznam"}
                    </Button>
                  }
                </>
              )}
            </Form>
          </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {isGrid ? (
        <RecipeGridList
          recipeList={filteredRecipeList}
          cardSize={isPhone ? RECIPE_DETAIL.SMALL : cardSize} //pokud na isPhone je true, tak se bude zobrazovat pouze malý detail
          ingredientsList={props.ingredientsList}
          isAuthorized={props.isAuthorized}
          handleUpdateRecipe={props.handleUpdateRecipe} handleDeleteRecipe={props.handleDeleteRecipe}
        />
      ) : (
        <RecipeTableList recipeList={filteredRecipeList} ingredientsList={props.ingredientsList}
        handleUpdateRecipe={props.handleUpdateRecipe} handleDeleteRecipe={props.handleDeleteRecipe}
        />
      )}
      {newRecipe &&
        <RecipeForm setNewRecipe={setNewRecipe} ingredientsList={props.ingredientsList}
                    onComplete={(recipe) => props.handleUpdateRecipe(recipe)}
        />
      }
    </div>
  );
}

export default RecipeList;