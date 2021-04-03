import React from 'react';
import style from './Modal.module.scss';
import Shade from '../Shade/Shade';

const Modal = (props) => {
  return (
    <React.Fragment>
      <Shade onClick={props.shadeClick} show={props.show}/>
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
};

export default React.memo(Modal);
