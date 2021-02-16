import React, {Component} from 'react';
import personStyles from './Person.module.css';
import buttonStyles from '../../../css/Button.module.css';
import PropTypes from 'prop-types';
import AuthContext from "../../../context/authContext";

/* Example os styled-components usage
import styled, {css} from 'styled-components';

const Button = styled.button`
  background: white;
  cursor: pointer;

  &:hover {
    background: #3a5695;
    color: #fff;
  };
  ${props => props.primary && css`
    background: red;
    color: white;
    &:hover {
      background: white;
      color: red;
    }`}
`;
*/

class Person extends Component {
  /* using hooks
  const [personState, setPersonState] = useState({name: props.name, age: props.age});
   const [personHobbies] = useState(props.children);
  */
  focusInput = (inputElem) => {
    inputElem && inputElem.focus();
  }

  static contextType = AuthContext;

  render() {
    const person = <div className={personStyles.person}>
      <label ref={(l) => this.l = l} htmlFor={`set_${this.props.id}`}>To reset the name </label>
      <input ref={this.focusInput} type="text" id={`set_${this.props.id}`}/>
      <button key={1} className={buttonStyles.btn} onClick={this.props.handleSetName}>Set the name</button>
      <p>My name is {this.props.name}! I'm {this.props.age} years old.</p>
      <p>My hobbies are: {this.props.children.join(', ')}.</p>
      <button className={`${buttonStyles.btn} ${buttonStyles.primary}`} key={2}
              onClick={this.props.deleteButtonHandler}>Delete person
      </button>
    </div>;

    return this.context.authenticated ? person : <p>Please log in</p>
  }
}

Person.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  deleteButtonHandler: PropTypes.func.isRequired,
  handleSetName: PropTypes.func.isRequired
}

export default Person;