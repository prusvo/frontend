import React, { useState } from 'react';

const DropdownExample = ({ selectedOption, onSelectChange }) => {
  
    if(!onSelectChange) {
      selectedOption = 'g'
    }
  
  return (
    <div>
    <select id="dropdown" value={selectedOption} onChange={onSelectChange} >
      <option value="g">g</option>
      <option value="l">l</option>
      <option value="kg">kg</option>
      <option value="spoon">Spoon</option>
    </select>
  </div>
  );
};

const RecipeForm = ({ onRecipeAdded }) => {
  const [recipeData, setRecipeData] = useState({
    dishName: '',
    ingredients: [{ name: '', amount: '', unit: 'g' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index][field] = value;
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleSelectChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index]['unit'] = value;
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: '', amount: '', unit: 'g' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://3.68.98.122:5001/recipe/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();

      if (response.ok) {
        onRecipeAdded(data);
        setRecipeData({
          dishName: '',
          ingredients: [],
        });
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dish Name:
        <input type="text" name="dishName" value={recipeData.dishName} onChange={handleChange} required />
      </label>

      <h3>Ingredients:</h3>
      {recipeData.ingredients.map((ingredient, index) => (
        <div className='add_input_box' key={index}>
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
          />
          <DropdownExample
            
            selectedOption={ingredient.unit}
            onSelectChange={(e) => handleSelectChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient}> 
        Add Ingredient
      </button>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
