import React, {useState, useCallback} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal'
import {request} from '../../api/request';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({present: false, message: ''});

  const removeIngredient = (id) => {
    setLoading(true);
    request({path: `/ingredients/${id}.json`, method: 'DELETE'})
      .then((response) => {
        setLoading(false);
        setIngredients(oldIngredients => {
          const removingIndex = oldIngredients.findIndex((elem) => elem.id === id);
          oldIngredients.splice(removingIndex, 1);
          return [...oldIngredients];
        })
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
        setIngredients(ingredients.concat({...ing, id: res.name}));
      })
      .catch(err => {
        setLoading(false);
        setError({present: true, message: err.message});
      });
  };

  const setFilteredIngredients = useCallback((ingredients) => {
    setIngredients(ingredients)
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
