import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const DropdownExample = ({ selectedOption, onSelectChange }) => {
  if (!onSelectChange) {
    selectedOption = "g";
  }
  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={onSelectChange}>
        <option value="g">g</option>
        <option value="l">l</option>
        <option value="kg">kg</option>
        <option value="spoon">Spoon</option>
      </select>
    </div>
  );
};

const RecipeEditor = ({ recipeId, initialDishName, initialIngredients }) => {
  const [newDishName, setNewDishName] = useState(initialDishName);
  const [newIngredients, setNewIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: '',
    unit: 'g',
  });
  const [token, setToken] = useState(" ");

  useEffect(() => {
    Axios.get('http://localhost:5000/auth/get_token')
      .then(response => {
        setToken(response.data.token);
      })
      .catch(error => {
        console.log('Error fetching token:', error);
      });
  }, []);

  const handleUpdateRecipe = async () => {
    try {
      console.log('Sending data to server:', { _id: recipeId, newDishName, newIngredients })

      const response = await fetch('http://localhost:5001/recipe/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      const response = await fetch('http://localhost:5001/recipe/addIngredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

  const handleDeleteIngredient = async (ingredientId) => {
    try {
      // Виклик серверного маршруту для видалення інгредієнта
      const response = await fetch(`http://localhost:5001/recipe/deleteIngredient/${recipeId}/${ingredientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Ingredient deleted successfully');
        // Оновити стан або виконати інші необхідні дії після видалення інгредієнта
      } else {
        console.error('Failed to delete ingredient');
        console.log(ingredientId);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setNewIngredient(prevState => ({ ...prevState, unit: value }));
  };
  const handleSelectChange2 = (e, index) => {
    const { value } = e.target;
    const updatedIngredients = [...newIngredients];
    updatedIngredients[index].unit = value;
    setNewIngredients(updatedIngredients);
  };
  
  return (
    <div>
      <input className="input__dish-name" type="text" value={newDishName} onChange={(e) => setNewDishName(e.target.value)} />

      <ul>
        {newIngredients?.map((ingredient, index) => (
          <li className='' key={index}>
            <input
              className="input__ingredients"
              value={ingredient.name}
              onChange={(e) => handleEditIngredient(index, { ...ingredient, name: e.target.value })}
            />
            <input
            type='number'
              className="input__ingredients"
              value={ingredient.amount}
              onChange={(e) => handleEditIngredient(index, { ...ingredient, amount: e.target.value })}
            />
            <DropdownExample
        selectedOption={ingredient.unit}
        onSelectChange={ (e) => handleSelectChange2(e, index)}
      />
             <button onClick={() => handleDeleteIngredient(ingredient._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type='string'
        className="input__ingredients"
        value={newIngredient.name}
        onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
      />
      <input
        type='number'
        placeholder='Amount'
        className="input__ingredients"
        value={newIngredient.amount}
        onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
      />
      <DropdownExample
        selectedOption={newIngredient.unit}
        onSelectChange={handleSelectChange}
      />



      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleUpdateRecipe}>Update Recipe</button>
    </div>
  );
};

export default RecipeEditor;
