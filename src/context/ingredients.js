import React, {useState, createContext, useContext} from "react";
import {axiosRequest} from "../helpers/api";
import {errorContext} from './error'
import {INGREDIENT_PRICES} from "../data/constants";
import {priceContext} from './price'

export const ingredientsContext = createContext();

const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState({});
  const {errorOccurred} = useContext(errorContext);
  const {price, setPrice} = useContext(priceContext);


  const getIngredients = async () => {
    try {
      const result = await axiosRequest.get('/ingredients.json');
      if(result?.data) {
        setIngredients(result.data)
      } else {
        errorOccurred({message: `Couldn't get the ingredients.`})
      }
    } catch (e) {
      errorOccurred(e)
    }
  }

  const addIngredient = (ingredientName) => {
    setPrice(price + INGREDIENT_PRICES[ingredientName])
    setIngredients(oldIngredients => {
      return {
        ...oldIngredients,
        [ingredientName]: ++oldIngredients[ingredientName]
      }
    })
  };

  const removeIngredient = (ingredientName) => {
    setPrice(price - INGREDIENT_PRICES[ingredientName])
    setIngredients(oldIngredients => {
      return {
        ...oldIngredients,
        [ingredientName]: --oldIngredients[ingredientName]
      }
    })
  };

  return <ingredientsContext.Provider value={{ingredients, getIngredients, addIngredient, removeIngredient}}>
    {children}
  </ingredientsContext.Provider>;
};

export default IngredientsProvider;
