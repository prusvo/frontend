import React, { useState, useEffect } from 'react';
import AddRecipeForm from '../form/AddRecipeForm';
import RecipeListAdmin from './RecipeList__ADMIN';
import RecipeListUser from './RecipeList__USER';
import Axios from 'axios';
import URL from '../url';
const AddandShowRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  
  const [admin, setAdmin] = useState(false)
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token not found');
          return;
        }
  
        const response = await Axios.get(`http://${URL.code}:5001/auth/admin_panel`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
  
        if (response.status === 200) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        // Помилка не виводиться
      }
    };
  
    checkAdmin();
  }, []);
  
  // useEffect(() => {
  //   Axios.get(`http://${URL.code}:5001/auth/get_token`, { withCredentials: true }) 
  // .then(response => {
  //   checkAdmin(response.data.token);
  //   console.log(response.data.token)
  // })
  // .catch(error => {
  //   console.log('Error fetching token:', error);
  // });

  // }, []);
  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     console.log(token)
  //     // checkAdmin(token)

  //   } catch (error) {
  //     console.log("token is not fined")
  //   }
    
 

  // }, []);
  
//   const checkAdmin = async (token) => {
//     try {
//         const response = await Axios.get(`http://${URL.code}:5001/auth/admin_panel`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true, 
//         });

//         if (response.status === 200) {
//             setAdmin(true);
//             console.log('You are ADMIN');
//         } else {
//             setAdmin(false);
//             console.log('You are USER or an error occurred');
//         }
//     } catch (err) {
//         if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//             // Помилка 401 або 403 означає, що користувач не є адміністратором
//             setAdmin(false);
//             console.log('You are USER');
//         } else {
//             // Інші помилки
//             console.log('Error checking admin status:', err);
//         }
//     } 
// };

  
        
      
      

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://${URL.code}:5001/recipe/menu`, {
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
      const response = await fetch(`http://${URL.code}:5001/recipe/delete/${recipeId}`, {
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
