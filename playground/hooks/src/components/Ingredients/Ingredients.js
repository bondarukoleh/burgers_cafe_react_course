import React, {useState, useEffect} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import {request} from '../../api/request';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    request({path: `/ingredients.json`})
      .then(ingredientsDB => {
        if(Object.keys(ingredientsDB).length) {
          const mappedIngredients = Object.entries(ingredientsDB).map(([id, {title, amount}]) => {
            return {id, title, amount}
          });
          setIngredients(mappedIngredients);
        }
      })
      .catch(err => console.log(`Something went wrong, couldn't get the ingredients`, err))
  }, [])

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

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient}/>
      <section>
        <Search/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient}/>
      </section>
    </div>
  );
}

export default Ingredients;
