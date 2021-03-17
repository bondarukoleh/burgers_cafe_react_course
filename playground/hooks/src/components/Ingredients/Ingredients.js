import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import {apiUrl} from "../../data/urls";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const removeIngredient = (id) => {
    const removingIndex = ingredients.findIndex((elem) => elem.id === id)
    ingredients.splice(removingIndex, 1);
    setIngredients([...ingredients]);
  }

  const addIngredient =  async (ing) => {
    try {
      const response = await fetch(`${apiUrl}/ingredients.json`,
        {method: 'POST', body: JSON.stringify(ing), headers: {'Content-Type': 'application/json'}});
      if(response.status < 400) {
        const createdIng = await response.json();
        setIngredients(ingredients.concat({...ing, id: createdIng.name}));
      } else {
        const error = await response.text()
        throw new Error(error ? error : `Couldn't create ingredient! ${response.status}, ${response.statusText}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient}/>
      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient}  />
      </section>
    </div>
  );
}

export default Ingredients;
