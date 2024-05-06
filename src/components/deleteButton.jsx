
import React from 'react';
import URL from '../url';


const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`http://${URL.code}:5001/recipe/delete`, {
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
    window.location.reload();
    // Additional processing after deleting data
  } catch (error) {
    console.error('Error deleting data:', error);
    // Handle error, e.g., show a notification to the user
  }
};

function DeleteButton({ id }) {
  return (
    <button className='recipe__box__button' onClick={() => deleteRecipe(id)}>Yes</button>
  );
}

export default DeleteButton;