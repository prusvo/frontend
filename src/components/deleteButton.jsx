
import React from 'react';

const deleteRecipe = async (id) => {
  try {
    const response = await fetch('http://3.71.202.234:5001/recipe/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data deleted:', data);
    // Additional processing after deleting data
  } catch (error) {
    console.error('Error deleting data:', error);
    // Handle error, e.g., show a notification to the user
  }
};

function DeleteButton({ id }) {
  return (
    <button onClick={() => deleteRecipe(id)}>Видалити рецепт</button>
  );
}

export default DeleteButton;