import React, { useState, useEffect } from 'react';
import AddRecipeForm from '../form/AddRecipeForm';
import RecipeListAdmin from './RecipeList__ADMIN';
import RecipeListUser from './RecipeList__USER';
import Axios from 'axios';
const AddandShowRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    Axios.get('http://localhost:5000/auth/get_token')
      .then(response => {
        
        checkAdmin(response.data.token);
      })
      .catch(error => {
        console.log('Error fetching token:', error);
      });
  }, []);
  
  const checkAdmin = async (token) => {
    try {
      const response = await Axios.get('http://localhost:5001/auth/admin_panel', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAdmin(true);
        console.log('You are ADMIN');
      } else {
        setAdmin(false);
        console.log('You are USER or an error occurred');
        // Perform additional actions or show a message to the user
      }
    } catch (err) {
      console.log('Error checking admin status:', err);
    }
  };
      
        
      
      

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5001/recipe/menu', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
          },
          
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setRecipes(data);
        } else {
          console.error('Error fetching recipes:', data.error);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const handleRecipeDeleted = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:5001/recipe/delete/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
      } else if (response.status === 404) {
        console.error('Recipe not found');
      } else {
        const data = await response.json();
        console.error('Error deleting recipe:', data.error);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe))
    );
  };

  
  if(admin) {
    return (
      <div><h2>you are Admin</h2>
        <AddRecipeForm onRecipeAdded={handleRecipeAdded}/>
        <RecipeListAdmin
          recipes={recipes}
          
          onRecipeDeleted={handleRecipeDeleted}
          
          onUpdate={handleRecipeUpdated}
        />
      </div>
    )
  } else {
    
    
  
  return (
    <div>
      

     
      {recipes.length > 0 ? (
        <RecipeListUser
          recipes={recipes}
          
        />
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );}
};

export default AddandShowRecipe;
