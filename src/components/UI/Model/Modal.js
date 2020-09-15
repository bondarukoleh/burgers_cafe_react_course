import React, {Component} from 'react';
import style from './Modal.module.scss';
import Shade from '../Shade/Shade'

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.show !== nextProps.show;
  }

  render() {
    return (
      <React.Fragment>
        <Shade onClick={this.props.purchasingHandler} show={this.props.show}/>
        <div
          className={style.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
