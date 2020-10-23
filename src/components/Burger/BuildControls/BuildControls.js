import React from "react";
import styles from './BuildControls.module.scss'
import BuildControl from "./BuildControl/BuildControl";
import {INGREDIENT_PRICES} from "../../../data/constants";

const BuildControls = (props) => {
  const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
  ];

  return (
    <div className={styles.BuildControls}>
      <p>Current price: <span style={{fontWeight: 'bold'}}>{props.price} $</span></p>
      {controls.map(({label, type}) => {
        return <BuildControl
          disabled={props.disabledControls[type]}
          key={label}
          label={label}
          addIngredient={() => props.addIngredient(type)}
          removeIngredient={() => props.removeIngredient(type)}
          ingredientPrice={INGREDIENT_PRICES[label.toLowerCase()]}
        />
      })}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasingHandler}
      >Make Order</button>
    </div>
  );
};

export default BuildControls;
