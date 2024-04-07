import React, { useState } from 'react';
import './upgrade.css'

const RecipeEditor = ({ recipeId, initialDishName, initialIngredients }) => {
  const [newDishName, setNewDishName] = useState(initialDishName);
  const [newIngredients, setNewIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState('');

  const handleUpdateRecipe = async () => {
    try {
        console.log('Sending data to server:', { _id: recipeId, newDishName, newIngredients })
        
      const response = await fetch('http://localhost:5000/recipe/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: recipeId, newDishName, newIngredients }),
      });

      if (response.ok) {
        console.log('Recipe updated successfully');
        // Add any additional logic or UI updates after the update
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddIngredient = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipe/addIngredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: recipeId, newIngredient }),
      });

      if (response.ok) {
        console.log('Ingredient added successfully');
        // Add any additional logic or UI updates after adding an ingredient
      } else {
        console.error('Failed to add ingredient');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleEditIngredient = (index, editedIngredient) => {
    const updatedIngredients = [...newIngredients];
    updatedIngredients[index] = editedIngredient;
    setNewIngredients(updatedIngredients);
  };

  return (
    <div>
      
      <input className='input__dish-name' type="text" value={newDishName} onChange={(e) => setNewDishName(e.target.value)} />
      
      
      <ul>
        {newIngredients.map((ingredient, index) => (
          <li key={index}>
          <input className='input__ingredients' value={ingredient} onChange={(e) => handleEditIngredient(index, e.target.value)} />
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
      />
      
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleUpdateRecipe}>Update Recipe</button>
    </div>
  );
};

export default RecipeEditor;
