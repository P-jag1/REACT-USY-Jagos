import appStyles from '../App.css';
import RecipeDetailPage from "../bricks/RecipeDetailPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
//konstanty
import { STATE, REQUEST_TYPE, API_URLS } from "../bricks/constants/ServerRequestStates";

function RecipeDetail() {
  const { id } = useParams();
  const [recipeListLoadCall, setRecipeDetailLoadCall] = useState({state: STATE.PENDING,});
  const [ingredientListLoadCall, setingredientListLoadCall] = useState({state: STATE.PENDING,});
  
  useEffect(() => {
    fetch(API_URLS.RECIPE_LIST_GET, { 
      method: REQUEST_TYPE.GET,
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeDetailLoadCall({ state: STATE.ERROR, error: responseJson });
      } else {
        setRecipeDetailLoadCall({ state: STATE.SUCCESS, data: responseJson });
      }
    }).catch((error) => {
      setRecipeDetailLoadCall({ state: STATE.ERROR, error: error });
    });
  }, []);

  useEffect(() => {
    fetch(API_URLS.RECIPE_INGREDIENTS_GET, { 
      method: REQUEST_TYPE.GET,
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setingredientListLoadCall({ state: STATE.ERROR, error: responseJson });
      } else {
        setingredientListLoadCall({ state: STATE.SUCCESS, data: responseJson });
      }
    }).catch((error)=>{
      setingredientListLoadCall({ state: STATE.ERROR, error: error });
    });
  }, []);

  function getChild() {
    if (recipeListLoadCall.state === STATE.SUCCESS && ingredientListLoadCall.state === STATE.SUCCESS) {
      return (
          <RecipeDetailPage recipeList={recipeListLoadCall.data} ingredientsList = {ingredientListLoadCall.data} recipeId={id} />
      );
    } else if (recipeListLoadCall.state === STATE.ERROR || ingredientListLoadCall.state === STATE.ERROR) {
        return (
          <div className={appStyles.error}>
            <div>Ajajaj něco se pokazilo</div>
            <br />
            <pre>{JSON.stringify(recipeListLoadCall.error, null, 2)}</pre>
          </div>
        );
    } else {
        return (
          <div className={appStyles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
    }
  }
  
    return (
      <div className="App">
        {getChild()}
      </div>
    );
}

export default RecipeDetail;