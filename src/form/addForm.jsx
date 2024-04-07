import { useState } from "react"



const RecipeForm = () => {
    const [formData, setFormData] = useState({ dishName: '', ingredients: '' });
    
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      
  
      try {
        const response = await fetch('http://localhost:5000/recipe/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Dish:</label>
        <input type="text" name="dishName" value={formData.dishName} onChange={handleInputChange} required />
  
        <label>Ingredients:</label>
        <input name="ingredients" value={formData.ingredients} onChange={handleInputChange} required />
  
        <button type="submit">Add Item</button>
      </form>
    )}
  
export default RecipeForm

