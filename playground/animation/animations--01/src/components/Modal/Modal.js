import React from 'react';
import './Modal.css';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';

const modal = (props) => {

  return (
    /*<Transition
      in={props.show}
      timeout={{enter: 4000, exit: 3000}}
      mountOnEnter
      unmountOnExit
      onEnter={() => console.log('onEnter-1: Fires the before we enter the entering mode')}
      onEntering={() => console.log('onEntering-2: Fires when we are in the entering mode')}
      onEntered={() => console.log('onEntered-3: Fires when we are in the entered mode')}
      onExit={() => console.log('onExit-4: Fires before exiting')}
      onExiting={() => console.log('onExiting-5: Fires in exiting mode')}
      onExited={() => console.log('onExited-6: Fires in exited mode')}
    >
      {(state) => (
        <div className={['Modal', ['entering', 'entered'].includes(state) ? 'ModalOpen' : 'ModalClosed'].join(' ')}>
          <h1>A Modal</h1>
          <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
      )}
    </Transition>*/

    <CSSTransition
      in={props.show}
      timeout={{enter: 4000, exit: 3000}}
      mountOnEnter
      unmountOnExit
      classNames={'fade-slide'}
    >
      <div className={'Modal'}>
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>Dismiss</button>
      </div>
    </CSSTransition>
  );
};

export default modal;