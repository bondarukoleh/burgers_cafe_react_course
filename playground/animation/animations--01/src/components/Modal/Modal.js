import React from 'react';
import './Modal.css';
import Transition from 'react-transition-group/Transition';

const modal = (props) => {

  return (
    <Transition
      in={props.show}
      timeout={{enter: 4000, exit: 3000}}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div className={['Modal', ['entering', 'entered'].includes(state) ? 'ModalOpen' : 'ModalClosed'].join(' ')}>
          <h1>A Modal</h1>
          <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
      )}
    </Transition>
  );
};

export default modal;