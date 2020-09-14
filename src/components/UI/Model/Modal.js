import React from 'react';
import style from './Moral.module.scss';
import Shade from '../Shade/Shade'

function Modal(props) {
  return (
    <React.Fragment>
      <Shade onClick={props.purchasingHandler} show={props.show}/>
      <div
        className={style.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-200vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Modal;
