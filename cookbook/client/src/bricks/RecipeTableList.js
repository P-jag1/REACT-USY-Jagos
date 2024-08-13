import React from "react";
import Table from "react-bootstrap/Table";

function RecipeTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID Receptu</th>
          <th>Název Receptu</th>
          <th>Popis Přípravy</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;