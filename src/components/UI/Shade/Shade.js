import React from 'react';
import style from './Shade.module.scss'

const Shade = (props) => {
return (
props.show ? <div
  className={style.Shade}
  onClick={props.purchasingHandler}
/> : null
)
};

export default Shade;