import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import { IoSearchOutline } from "react-icons/io5";

const SearchRecipes = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Доданий стан для відстеження чи виконувався пошук
  const [searchable, setSearchable] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://3.68.98.122:5001/recipe/search?query=${query}`);
      setRecipes(response.data);
      setLoading(false);
      setSearched(true); // Встановлюємо, що пошук виконаний
    } catch (error) {
      console.error('Error searching recipes:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length >= 3) {
      setSearchable(true);
    } else {
      setSearchable(false);
      setRecipes([]);
    }
  };

  return (
    <div className='container'>
      <div className="input__search">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Hinted search text"
        />
        
        <button onClick={handleSearch} disabled={!searchable || loading}>
          <IoSearchOutline/>
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && recipes.length === 0 && searched && (
        <p className='no__found'>No recipes found.</p>
      )}

      {!loading && recipes.length > 0 && (
        <ul className="recipe__list">
          {recipes.map((recipe) => (
            <div className='recipe__box' key={recipe._id}>
              <h3 className='recipe__box__tittle'>{recipe.dishName}</h3>
              <ul className="ingredient__box">
                {recipe.ingredients.map((ingredient, i) => (
                  <li className="ingredients toggle" key={i}>{`${ingredient.name} ${ingredient.amount}${ingredient.unit}`} <input className='checkbox' type='checkbox' /></li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchRecipes;
