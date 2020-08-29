import React, {useState} from 'react';
import './Person.css';
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

  return <div className="person">
    <label htmlFor={`set${personState.name}`}>To reset the name </label>
    <input type="text" id={`set${personState.name}`}/>
    {/*<Button key={1} onClick={handleSetName}>Set the name</Button>*/}
    <p>My name is {personState.name}! I'm {personState.age} years old.</p>
    <p>My hobbies are: {personHobbies.join(', ')}.</p>
    {/*<Button primary key={2} onClick={props.deleteButtonHandler}>Delete person</Button>*/}
  </div>;
};

export default Person;