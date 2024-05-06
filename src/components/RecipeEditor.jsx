import React, { useState, useEffect } from "react";

import URL from "../url";
import "./recipeeditor.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";

const DropdownExample = ({ selectedOption, onSelectChange }) => {
  if (!onSelectChange) {
    selectedOption = "g";
  }
  return (
    <div>
      <select
        className="dropdown"
        id="dropdown"
        value={selectedOption}
        onChange={onSelectChange}
      >
        <option value="g">g</option>
        <option value="l">l</option>
        <option value="x">x</option>
        <option value="kg">kg</option>
        <option value="Tbsp">Tbsp</option>
        <option value="Tsp">Tsp</option>
        <option value=""></option>
        

      </select>
    </div>
  );
};

const RecipeEditor = ({
  recipeId,
  initialDishName,
  initialIngredients,
  onClose,
}) => {
  const [newDishName, setNewDishName] = useState(initialDishName);
  const [newIngredients, setNewIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
  });
  const [token, setToken] = useState(" ");

  // useEffect(() => {
  //   Axios.get(`http://${URL.code}:5001/auth/get_token`)
  //     .then(response => {
  //       setToken(response.data.token);
  //     })
  //     .catch(error => {
  //       console.log('Error fetching token:', error);
  //     });
  // }, []);
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateRecipe = async () => {
    try {
      console.log("Sending data to server:", {
        _id: recipeId,
        newDishName,
        newIngredients,
      });

      const response = await fetch(`http://${URL.code}:5001/recipe/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: recipeId, newDishName, newIngredients }),
      });

      if (response.ok) {
        console.log("Recipe updated successfully");
        window.location.reload();
        // Add any additional logic or UI updates after the update
      } else {
        console.error("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddIngredient = async () => {
    try {
      const response = await fetch(
        `http://${URL.code}:5001/recipe/addIngredient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ _id: recipeId, newIngredient }),
        }
      );

      if (response.ok) {
        console.log("Ingredient added successfully");
        // Add any additional logic or UI updates after adding an ingredient
      } else {
        console.error("Failed to add ingredient");
      }
    } catch (error) {
      console.error("Error:", error);
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
      const response = await fetch(
        `http://${URL.code}:5001/recipe/deleteIngredient/${recipeId}/${ingredientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Ingredient deleted successfully");
        // Оновити стан або виконати інші необхідні дії після видалення інгредієнта
      } else {
        console.error("Failed to delete ingredient");
        console.log(ingredientId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setNewIngredient((prevState) => ({ ...prevState, unit: value }));
  };
  const handleSelectChange2 = (e, index) => {
    const { value } = e.target;
    const updatedIngredients = [...newIngredients];
    updatedIngredients[index].unit = value;
    setNewIngredients(updatedIngredients);
  };

  return (
    <div className="recipe__editor">
      <input
        className="input__dish-name"
        type="text"
        value={newDishName}
        onChange={(e) => setNewDishName(e.target.value)}
      />

      <ul>
        {newIngredients?.map((ingredient, index) => (
          <li className="editor__box" key={index}>
            <input
              className="input__ingredient"
              value={ingredient.name}
              onChange={(e) =>
                handleEditIngredient(index, {
                  ...ingredient,
                  name: e.target.value,
                })
              }
            />
            <input
              type="number"
              className="input__number"
              value={ingredient.amount}
              onChange={(e) =>
                handleEditIngredient(index, {
                  ...ingredient,
                  amount: e.target.value,
                })
              }
            />
            <DropdownExample
              selectedOption={ingredient.unit}
              onSelectChange={(e) => handleSelectChange2(e, index)}
            />
            <button
              className="button__editor"
              onClick={() => handleDeleteIngredient(ingredient._id)}
            >
              <RiDeleteBin6Line />
            </button>
          </li>
        ))}
      </ul>

      <div className="editor__box add">
        <input
          type="string"
          className="input__ingredient"
          value={newIngredient.name}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          className="input__number"
          value={newIngredient.amount}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, amount: e.target.value })
          }
        />
        <DropdownExample
          selectedOption={newIngredient.unit}
          onSelectChange={handleSelectChange}
        />
        <button className="button__editor" onClick={handleAddIngredient}>
          <MdAddCircleOutline />
        </button>
      </div>

      <div className="buttons__editor">
        <button className="recipe__box__button" onClick={handleUpdateRecipe}>
          Update
        </button>
        <button className="recipe__box__button" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default RecipeEditor;
