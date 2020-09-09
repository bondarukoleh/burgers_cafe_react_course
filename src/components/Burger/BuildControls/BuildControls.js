import React from "react";
import styles from './BuildControls.module.scss'
import BuildControl from "./BuildControl/BuildControl";
import {ingredientPrices} from  '../../../containers/BurgerBuilder/BurgerBuilder'

const BuildControls = (props) => {
  const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
  ];

  return (
    <div className={styles.BuildControls}>
      <p>Current price: {props.price} $</p>
      {controls.map(({label, type}) => {
        return <BuildControl
          disabled={props.disabledControls[type]}
          key={label}
          label={label}
          addIngredient={() => props.addIngredient(type)}
          removeIngredient={() => props.removeIngredient(type)}
          ingredientPrice={ingredientPrices[label.toLowerCase()]}
        />
      })}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
      >Make Order</button>
    </div>
  );
};

export default BuildControls;
