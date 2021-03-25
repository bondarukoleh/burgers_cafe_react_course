import React, {useCallback, useMemo, useReducer} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal'
import {request} from '../../api/request';

const IngredientActionTypes = {
  set: 'SET',
  add: 'ADD',
  remove: 'REMOVE',
}
const ApiRequestActionTypes = {
  sending: 'SENDING',
  success: 'SUCCESS',
  error: 'ERROR',
  clear_error: 'CLEAR_ERROR',
}

const ingredientReducer = (currentIgredients, action) => {
  switch (action.type) {
    case IngredientActionTypes.set:
      return action.ingredients;
    case IngredientActionTypes.add:
      return currentIgredients.concat(action.ingredient);
    case  IngredientActionTypes.remove:
      return currentIgredients.filter((elem) => elem.id !== action.id);
    default:
      throw Error("Shouldn't get here in ingredientReducer!");
  }
}
const apiRequestReducer = (currentState, action) => {
  switch (action.type) {
    case ApiRequestActionTypes.sending:
      return {loading: true, error: null};
    case ApiRequestActionTypes.success:
      return {...currentState, loading: false};
    case ApiRequestActionTypes.error:
      return {loading: false, error: action.error};
    case ApiRequestActionTypes.clear_error:
      return {...currentState, error: null};
    default:
      throw Error("Shouldn't get here in apiRequestReducer!");
  }
}

const getDefaultIfEmpty = (err, message) => (err && err.message)
  ? err.message
  : `Sorry something went wrong. ${message}`;

function Ingredients() {
  const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  const [apiRequestState, dispatchRequestReducer] = useReducer(apiRequestReducer, {loading: false, error: null});
  /* With useState
   const [ingredients, setIngredients] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({present: false, message: ''}); */

  const removeIngredient = useCallback((id) => {
    dispatchRequestReducer({type: ApiRequestActionTypes.sending})
    request({path: `/ingredients/${id}.json`, method: 'DELETE'})
      .then((response) => {
        dispatchRequestReducer({type: ApiRequestActionTypes.success})
        dispatchIngredients({type: IngredientActionTypes.remove, id: id})
      })
      .catch(err => {
        dispatchRequestReducer({type: ApiRequestActionTypes.error, error: getDefaultIfEmpty(err.message, 'Remove ingredient.') });
      })
  }, []);
  const addIngredient = useCallback(async (ing) => {
    dispatchRequestReducer({type: ApiRequestActionTypes.sending});
    try {
      const result = await request({
        path: '/ingredients.json',
        method: 'POST',
        body: JSON.stringify(ing)
      })
      dispatchRequestReducer({type: ApiRequestActionTypes.success})
      dispatchIngredients({type: IngredientActionTypes.add, ingredient: {...ing, id: result.name}})
      /*setIngredients(ingredients.concat({...ing, id: res.name}));*/
    } catch (err) {
      dispatchRequestReducer({type: ApiRequestActionTypes.error, error: getDefaultIfEmpty(err)});
      /* with use state:
       setLoading(false);
       setError({present: true, message: err.message}); */
    }
  }, []);
  const setFilteredIngredients = useCallback((ingredients) => {
    dispatchIngredients({type: IngredientActionTypes.set, ingredients})
    /* setIngredients(ingredients) */
  }, []);

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient}/>
  }, [ingredients, removeIngredient])

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} loading={apiRequestState.loading}/>
      <section>
        <Search onFilteredIngredients={setFilteredIngredients}/>
        {ingredientList}
        {apiRequestState.error && <ErrorModal onClose={() => dispatchRequestReducer({type: ApiRequestActionTypes.clear_error})}>
          <p>{apiRequestState.error}</p>
        </ErrorModal>}
      </section>
    </div>
  );
}

export default Ingredients;
