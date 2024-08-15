import appStyles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import CookbookHeader from "./bricks/CookbookHeader";
import RecipeList from "./bricks/RecipeList";
//konstanty
import { STATE, REQUEST_TYPE } from "./bricks/constants/ServerRequestStates";

const title= {
  name: "Vymazlená Kuchařka",
};

function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: STATE.PENDING,
  });

  const [ingredienceListLoadCall, setingredienceListLoadCall] = useState({
    state: STATE.PENDING,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: REQUEST_TYPE.GET,
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: STATE.ERROR, error: responseJson });
      } else {
        setRecipeListLoadCall({ state: STATE.SUCCESS, data: responseJson });
      }
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, { 
      method: REQUEST_TYPE.GET,
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setingredienceListLoadCall({ state: STATE.ERROR, error: responseJson });
      } else {
        setingredienceListLoadCall({ state: STATE.SUCCESS, data: responseJson });
      }
    });
  }, []); 

  function getChild() {
    if (recipeListLoadCall.state === STATE.SUCCESS && ingredienceListLoadCall.state === STATE.SUCCESS) {
      return (
          <>
            <CookbookHeader title={title}/>
            <RecipeList recipeList={recipeListLoadCall.data}/>
          </>
      );
    } else if (recipeListLoadCall.state === STATE.ERROR || ingredienceListLoadCall.state === STATE.ERROR) {
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

export default App;
