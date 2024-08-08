import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import recipeList from "./data/MockUpData";
import CookbookHeader from "./bricks/CookbookHeader";
import RecipeList from "./bricks/RecipeList";

const title= {
  name: "Vymazlená Kuchařka",
};

function App() {
  return (
    <div className="App">
        <CookbookHeader title={title}/>
        <RecipeList recipeList={recipeList}/>
    </div>
  );
}

export default App;
