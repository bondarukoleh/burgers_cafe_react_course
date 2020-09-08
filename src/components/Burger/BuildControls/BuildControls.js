import React from "react";
import styles from './BuildControls.module.scss'
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {
  const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
  ];

  return (
    <div className={styles.BuildControls}>
      {controls.map(({label, type}) => {
        return <BuildControl
          key={label}
          label={label}
          addIngredient={() => props.addIngredient(type)}
          removeIngredient={() => props.removeIngredient(type)}
        />
      })}
    </div>
  );
};

export default BuildControls;
