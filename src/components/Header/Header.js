import React from 'react';

const Header = (props) => {
  const hideStyle = () => ({background: `${props.showPersons ? 'lightgreen' : '#c06c6c'}`});

  return (
    <header className="App-header">
      <h1>Hello App</h1>
      <input type='checkbox' id='showPersons' onChange={props.hidePersonsHandler}/>
      <label htmlFor='showPersons' style={hideStyle()}> Hide persons.</label>
    </header>
  );
};

export default Header;