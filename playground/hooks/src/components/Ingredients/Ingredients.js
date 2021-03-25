import React, {useState, useCallback, useReducer} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal'
import {request} from '../../api/request';

const ingredientReducer = (currentIgredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return currentIgredients.concat(action.ingredient);
    case 'REMOVE':
      return currentIgredients.filter((elem) => elem.id !== action.id);
    default:
      throw Error("Shouldn't get here in ingredientReducer!");
  }
}

function Ingredients() {
  const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  /* With useState const [ingredients, setIngredients] = useState([]); */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({present: false, message: ''});

  const removeIngredient = (id) => {
    setLoading(true);
    request({path: `/ingredients/${id}.json`, method: 'DELETE'})
      .then((response) => {
        setLoading(false);
        dispatchIngredients({type: 'REMOVE', id: id})
      })
      .catch(err => {
        setLoading(false);
        setError({present: true, message: err.message});
      })
  };

  const addIngredient = async (ing) => {
    setLoading(true);
    request({
      path: '/ingredients.json',
      method: 'POST',
      body: JSON.stringify(ing)
    })
      .then(res => {
        setLoading(false);
        dispatchIngredients({type: 'ADD', ingredient: {...ing, id: res.name}})
        /*setIngredients(ingredients.concat({...ing, id: res.name}));*/
      })
      .catch(err => {
        setLoading(false);
        setError({present: true, message: err.message});
      });
  };

  const setFilteredIngredients = useCallback((ingredients) => {
    dispatchIngredients({type: 'SET', ingredients})
    /* setIngredients(ingredients) */
  }, []);

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} loading={loading}/>
      <section>
        <Search onFilteredIngredients={setFilteredIngredients}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient}/>
        {error.present && <ErrorModal onClose={() => setError({present: false})}>
          <p>{error?.message?.length ? error.message : 'Something went wrong, sorry about that'}</p>
        </ErrorModal>}
      </section>
    </div>
  );
}

export default Ingredients;
