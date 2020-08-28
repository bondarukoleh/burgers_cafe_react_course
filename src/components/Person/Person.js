import React, {useState} from 'react';

const Person = (props) => {
  const [personState, setPersonState] = useState({name: props.name, age: props.age});
  const [personHobbies] = useState(props.children);

  const handleSetName = (e) => {
    const input = document.querySelector(`#set${personState.name}`)
    if (!input.value) {
      return;
    }
    setPersonState({name: input.value, age: props.age});
    input.value = '';
  };

  return <div className="person">
    <label htmlFor={`set${personState.name}`}>To reset the name </label>
    <input type="text" id={`set${personState.name}`} />
    <button onClick={handleSetName}>Set the name</button>
    <p>My name is {personState.name}! I'm {personState.age} years old.</p>
    <p>My hobbies are: {personHobbies.join(', ')}.</p>
  </div>;
};

export default Person;