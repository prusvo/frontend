import React, { useState } from 'react';
import DeleteButton from './deleteButton';
import RecipeEditor from './RecipeEditor';

import './recipelist.css'


const RecipeListAdmin = ({ recipes, openEditors, onRecipeDeleted, onToggleEditor, onUpdate }) => (
  <ul>
    {recipes.slice().reverse().map((recipe, i) => (
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
  const [acceptForm, setAcceptForm] = useState(false)
  const toggle = (_id) => {
  setOpen(!open)
  
  }
  const openAccept = () => {
    setAcceptForm(!acceptForm)
  }
if (!recipe) {
  return null;
}

return (
  <div className="container">
    <div className='recipe__list'>
      
      <div className="box">
      <h2 className={open ? 'recipe__box__tittle close' : 'recipe__box__tittle '}>{recipe.dishName}</h2>
      <div className="editor">
        
        <div className={!open ? "recipe_editor" : "recipe_editor toggle"}>
          <RecipeEditor
            recipeId={recipe._id}
            initialDishName={recipe.dishName}
            initialIngredients={recipe.ingredients}
            onUpdate={onUpdate}
            onDelete={() => onRecipeDeleted(recipe._id)}
             onClose={toggle}
          />
        </div>
      </div>
      <div className={ !open ? "ingredient__box" : "ingredient__box close"}>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, i) => (
            <li
              className="ingredients toggle"
              key={i}
            >
              {`${ingredient.amount ? `${ingredient.amount} ${ingredient.unit}` : ''} ${ingredient.name}`}
              <input className='checkbox' type="checkbox" />
            </li>
          ))}
        
      </ul>
      <div className="buttons__editor">
      <button className='edit__button' onClick={toggle}>Edit</button>
      <button className='edit__button'onClick={openAccept} > Delete</button>
          {/* <DeleteButton id={recipe._id} onDelete={() => onRecipeDeleted(recipe._id)} /> */}
      </div>
      </div>
      </div>
      <div className={!acceptForm ? "overlay close" : "overlay"}></div>
      <div className={!acceptForm ? "acceptForm close" : "acceptForm"}>
      
        <h4>are you sure?</h4>
        <div className="accept__buttons">
        <DeleteButton id={recipe._id} onDelete={() => onRecipeDeleted(recipe._id)} />
        <button onClick={openAccept}>no</button>
        
        </div>
      </div>
  </div>
      
  </div>
);
};

export default RecipeListAdmin;