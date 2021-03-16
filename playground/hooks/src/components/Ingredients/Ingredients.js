import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const removeIngredient = (id) => {
    const removingIndex = ingredients.findIndex((elem) => elem.id === id)
    ingredients.splice(removingIndex, 1);
    setIngredients([...ingredients]);
  }

  const addIngredient = (ing) => setIngredients(ingredients.concat(ing));

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
