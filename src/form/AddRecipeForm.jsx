import React, { useState } from 'react';
import URL from '../url';
import "./addform.css"
import { MdAddCircleOutline } from "react-icons/md";

const DropdownExample = ({ selectedOption, onSelectChange }) => {
  
    if(!onSelectChange) {
      selectedOption = 'g'
    }
  
  return (
    <div >
    <select className='dropdown' id="dropdown" value={selectedOption} onChange={onSelectChange} >
      <option value="g">g</option>
      <option value="l">l</option>
      <option value="x">x</option>
      <option value="kg">kg</option>
      <option value="Tbsp">Tbsp</option>
      <option value="Tsp">Tsp</option>
      <option value=""> </option>
      
    </select>
  </div>
  );
};

const RecipeForm = ({ onRecipeAdded }) => {
  const [submitting, setSubmitting] = useState(false);
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

  // const handleSubmit = async (e) => {
    

  //   try {
  //     const response = await fetch(`http://${URL.code}:5001/recipe/add`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
          
  //       },
  //       body: JSON.stringify(recipeData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       onRecipeAdded(data);
  //       setRecipeData({
  //         dishName: '',
  //         ingredients: [],
  //       });
  //     } else {
  //       console.error('Error:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Перешкоджає перезавантаженню сторінки при відправці форми
    setSubmitting(true);
  
    // Перевіряємо кожен інгредієнт на пусте значення amount
    const hasEmptyAmount = recipeData.ingredients.some(ingredient => ingredient.amount === '');
  
    // Якщо є хоча б один інгредієнт з пустим amount, встановлюємо йому значення " "
    if (hasEmptyAmount) {
      const updatedIngredients = recipeData.ingredients.map(ingredient => {
        if (ingredient.amount === '') {
          return {
            ...ingredient,
            amount: ' '
          };
        }
        return ingredient;
      });
  
      setRecipeData(prevData => ({
        ...prevData,
        ingredients: updatedIngredients
      }));
    }
  
    try {
      const response = await fetch(`http://${URL.code}:5001/recipe/add`, {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
   <div className="container">
    <div className="overlay"></div>
     <div className="add__form">
      <div className="box">
      <h2>New Recipe</h2>
        <div className="box__inner">
        <form onSubmit={handleSubmit}>
        <h4>Recipe:</h4>
      <label>
        <input className='input__ingredient' type="text" name="dishName" value={recipeData.dishName} onChange={handleChange} required />
      </label>

      <h4>Ingredients:</h4>
      {recipeData.ingredients.map((ingredient, index) => (
        <div className='add_input_box' key={index}>
          <input
          className='input__ingredient'
            type="text"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
          />
          <input
            className='input__number'
            type="number"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
          />
          <DropdownExample
            
            selectedOption={ingredient.unit}
            onSelectChange={(e) => handleSelectChange(index, e.target.value)}
          />
          <button className='button__editor' type="button" onClick={handleAddIngredient}> 
             <MdAddCircleOutline/>
          </button>
        </div>
      ))}
      <div className="buttons__editor">
      
      <button id='submit' type="submit" disabled={submitting}>{submitting ? 'Adding Recipe...' : 'Add Recipe'}</button>
      </div>
      
    </form>
    
        </div>
      </div>
     </div>
   </div>
  );
};

export default RecipeForm;
