import React from "react";
import Table from "react-bootstrap/Table"; 
import Icon from '@mdi/react';
import { mdiBlenderOutline } from '@mdi/js';
import ingredientStyles from "../css/ingredientList.module.css";

function IngredientList(props) {
  return (
    <Table className={ingredientStyles.table}>
        <thead>
            <tr>
                <th className={ingredientStyles.Name}>Název Ingredience</th>
            </tr>
        </thead>
        <tbody>
            {props.ingredientsList.map((ingredient) => ( <tr key={ingredient.id}> <td className={ingredientStyles.ingredient}>
           <Icon
            className={ingredientStyles.icon}
            path={mdiBlenderOutline}
            size={1}
          />
          {ingredient.name}
        </td>
      </tr>
    ))}
  </tbody>
</Table>
  );
}

export default IngredientList;