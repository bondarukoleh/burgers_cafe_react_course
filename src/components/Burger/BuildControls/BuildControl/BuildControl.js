import React from "react";
import style from './BuildControl.module.scss'

const BuildControl = (props) => {
  return (
    <div className={style.BuildControl} id={props.label}>
      <div className={style.Label}>{props.label}</div>
      <button
        disabled={props.disabled}
        onClick={props.removeIngredient}
        className={style.Less}
      >Less</button>
      <button onClick={props.addIngredient} className={style.More}>More</button>
    </div>
  )
}

export default BuildControl;
