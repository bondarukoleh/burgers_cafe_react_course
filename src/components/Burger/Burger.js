import React from "react";
import styles from './Burger.module.scss'
import utilities from '../../sass/utilities.module.scss'
import Ingredient from "./Ingredient/Ingredient";
import PropTypes from 'prop-types'

const Burger = (props) => {
  const createIngredient = (type, times) => {
    if(times <= 0) {
      return null;
    }

    return Array.from(new Array(+times)).map((v, i) => <Ingredient key={type+i} type={type} />)
  }

  const noIngredients = () => {
    return <div>You can add ingredients here!</div>
  }

  const renderIngredients = () => {
    return Object.entries(props.ingredients).map(([type, times]) => createIngredient(type, times));
  }

  const ingredients = renderIngredients().filter(i => !!i);
  const ingredientsLength = ingredients.flat().length;
  const attachedClasses = [styles.Burger, !ingredientsLength && styles.noIngredients];

  return (
    <div className={utilities.wrapper}>
      <div className={attachedClasses.filter(i => !!i).join(' ')}>
        <Ingredient type={'bread-top'} />
        {ingredientsLength ? ingredients : noIngredients()}
        <Ingredient type={'bread-bottom'} />
      </div>
    </div>
  )
}

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default Burger;