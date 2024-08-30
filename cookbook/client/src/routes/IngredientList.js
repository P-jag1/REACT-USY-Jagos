import appStyles from '../App.css';
import IngredientList from "../bricks/IngredientList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
//konstanty
import { STATE, REQUEST_TYPE, API_URLS } from "../bricks/constants/ServerRequestStates";
  
  function IngredientListLoad() {
    const [ingredientListLoadCall, setingredientListLoadCall] = useState({state: STATE.PENDING,});
  
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
      if (ingredientListLoadCall.state === STATE.SUCCESS) {
        return (
            <IngredientList ingredientsList = {ingredientListLoadCall.data}/>
        );
      } else if (ingredientListLoadCall.state === STATE.ERROR) {
          return (
            <div className={appStyles.error}>
              <div>Ajajaj něco se pokazilo</div>
              <br />
              <pre>{JSON.stringify(ingredientListLoadCall.error, null, 2)}</pre>
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

  
  export default IngredientListLoad;