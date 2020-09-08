import React from "react";
import style from './BuildControl.module.scss'

const BuildControl = (props) => {
  return (
    <div className={style.BuildControl} id={props.label}>
      <div className={style.Label}>{props.label}</div>
      <button onClick={props.addIngredient} className={style.More}>More</button>
      <button onClick={props.removeIngredient} className={style.Less}>Less</button>
    </div>
  )
}

export default BuildControl;
