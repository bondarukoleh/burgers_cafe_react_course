import React from "react";
import styles from './Burger.module.scss'
import utilities from '../../sass/utilities.module.scss'
import Ingredient from "./Ingredient/Ingredient";
import PropTypes from 'prop-types'

const Burger = (props) => {
  const createIngredient = (type, times) => {
    return Array.from(new Array(times)).map((v, i) => <Ingredient key={type+i} type={type} />)
  }

  const renderIngredients = () => {
    return Object.entries(props.ingredients).map(([type, times]) => createIngredient(type, times))
  }

  return (
    <div className={utilities.wrapper}>
      <div className={styles.Burger}>
        <Ingredient type={'bread-top'} />
        {renderIngredients()}
        <Ingredient type={'bread-bottom'} />
      </div>
    </div>
  )
}

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default Burger;