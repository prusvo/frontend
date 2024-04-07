import React, { useState } from 'react';
import DeleteButton from './deleteButton';
import RecipeEditor from './RecipeEditor';
import { FaRegEdit } from "react-icons/fa";
import './recipelist.css'

const RecipeListAdmin = ({ recipes, openEditors, onRecipeDeleted, onToggleEditor, onUpdate }) => (
  <ul>
    {recipes.map((recipe, i) => (
      <RecipeItem
         key={i}
        recipe={recipe}

        onRecipeDeleted={onRecipeDeleted}
        
        onUpdate={onUpdate}
      />
    ))}
  </ul>
);

const RecipeItem = ({ recipe, onRecipeDeleted, onUpdate }) => {
  const [open, setOpen] = useState(false)
  const toggle = (_id) => {
  setOpen(!open)
}
if (!recipe) {
  return null;
}

return (
  <li>
    <strong className={open ? 'dish_name' : 'dish_name toggle'}>{recipe.dishName}</strong>
    <ul>
      {recipe.ingredients &&
        recipe.ingredients.map((ingredient, i) => (
          <li
            className={open ? "ingredients" : "ingredients toggle"}
            key={i}
          >
            {`${ingredient.amount} ${ingredient.unit}  ${ingredient.name}`}
          </li>
        ))}
      <DeleteButton id={recipe._id} onDelete={() => onRecipeDeleted(recipe._id)} />
      <button className='edit__button' onClick={toggle}>
        <FaRegEdit />
      </button>
      <div className={!open ? "recipe_editor" : "recipe_editor toggle"}>
        <RecipeEditor
          recipeId={recipe._id}
          initialDishName={recipe.dishName}
          initialIngredients={recipe.ingredients}
          onUpdate={onUpdate}
          onDelete={() => onRecipeDeleted(recipe._id)}
        />
      </div>
    </ul>
  </li>
);
};

export default RecipeListAdmin;