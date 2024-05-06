import React from 'react';


const RecipeListUser = ({ recipes }) => (
  <ul>
    {recipes.slice().reverse().map((recipe, i) => (
      <RecipeItem
         key={i}
        recipe={recipe}
        
      />
    ))}
  </ul>
);

const RecipeItem = ({ recipe, openEditor}) => (
  <div className="container">
    <div className="recipe__list">
      <div className='box'>
        <h3 className='recipe__box__tittle'>{recipe.dishName}</h3>
        <ul className="ingredient__box">
          <div className='ingredient__box__inner'>
            {
              recipe.ingredients.map((ingredient, i) => (
                <li className="ingredients toggle" key={i}>
                  {`${ingredient.amount ? `${ingredient.amount} ${ingredient.unit}` : ''} ${ingredient.name}`}
                  <input className='checkbox' type='checkbox' />
                </li>
              ))
            }
          </div>
        </ul>
      </div>
    </div>
  </div>
);


export default RecipeListUser;