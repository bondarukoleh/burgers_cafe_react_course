import React, {useState, useCallback} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import {request} from '../../api/request';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const removeIngredient = (id) => {
    request({path: `/ingredients/${id}.json`, method: 'DELETE'})
      .then(() => {
        setIngredients(oldIngredients => {
          const removingIndex = oldIngredients.findIndex((elem) => elem.id === id);
          oldIngredients.splice(removingIndex, 1);
          return [...oldIngredients];
        })
      })
      .catch(err => console.log(`Something went wrong, couldn't delete the ingredients`, err))
  };

  const addIngredient = async (ing) => {
    const response = await request({
      path: '/ingredients.json',
      method: 'POST',
      body: JSON.stringify(ing)
    });
    setIngredients(ingredients.concat({...ing, id: response.name}));
  };

  const setFilteredIngredients = useCallback((ingredients) => {
    setIngredients(ingredients)
  }, []);

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient}/>
      <section>
        <Search onFilteredIngredients={setFilteredIngredients}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient}/>
      </section>
    </div>
  );
}

export default Ingredients;
