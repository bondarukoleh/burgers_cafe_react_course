import React, {useState} from 'react';
import personStyles from './Person.module.css';
import buttonStyles from '../../css/Button.module.css';

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

const Person = (props) => {
  const [personState, setPersonState] = useState({name: props.name, age: props.age});
  const [personHobbies] = useState(props.children);

  const handleSetName = (e) => {
    const input = document.querySelector(`#set${personState.name}`);
    if (!input.value) {
      return;
    }
    setPersonState({name: input.value, age: props.age});
    input.value = '';
  };

  return <div className={personStyles.person}>
    <label htmlFor={`set${personState.name}`}>To reset the name </label>
    <input type="text" id={`set${personState.name}`}/>
    <button key={1} className={buttonStyles.btn} onClick={handleSetName}>Set the name</button>
    <p>My name is {personState.name}! I'm {personState.age} years old.</p>
    <p>My hobbies are: {personHobbies.join(', ')}.</p>
    <button className={`${buttonStyles.btn} ${buttonStyles.primary}`} key={2} onClick={props.deleteButtonHandler}>Delete person</button>
  </div>;
};

export default Person;