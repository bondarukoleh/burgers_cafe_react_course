import React from 'react';
import '../css/App.css';
import Person from "./Person/Person";

const DBData = {
  persons: [
    {name: "Oleh", age: 30, hobbies: ['Programming', 'Bicycling', 'Guitar']},
    {name: "Vasia", age: 24, hobbies: ['Beer', 'Movies', 'Music']}
  ]
};

const App = () => {
  return <div className="App">
    <header className="App-header">
      <h1>Hello App</h1>
      <div className="person-wrap">
        {DBData.persons.map(({name, age, hobbies}) => <Person name={name} age={age} key={name}>{hobbies}</Person>)}
      </div>
    </header>
  </div>;
};

export default App;
