import React, {Component} from 'react';
import '../css/App.css';
import Person from "./Person/Person";

class App extends Component {
  state = {
    showPersons: true,
    persons: [
      {id: 'qwe', name: "Oleh", age: 30, hobbies: ['Programming', 'Bicycling', 'Guitar']},
      {id: 'ert', name: "Vasia", age: 24, hobbies: ['Beer', 'Movies', 'Music']}
    ]
  };

  toggleShowingPersons = function (e) {
    this.setState({showPersons: !e.target.checked});
  }.bind(this);

  deletePerson = (personId) => {
    const persons =  [...this.state.persons];
    const indexToDelete = persons.findIndex(({id}) => id === personId);
    persons.splice(indexToDelete, 1);
    this.setState({persons});
  }

  render() {
    const {showPersons} = this.state;
    let persons = null;
    if (showPersons) {
      persons = <div className="person-wrap">
        {
          this.state.persons
          .map(({name, age, hobbies, id}) =>
            <Person
              name={name}
              age={age}
              key={id}
              deleteButtonHandler={() => this.deletePerson(id)}>{hobbies}</Person>)
        }
      </div>;
    }

    return <div className="App">
      <header className="App-header">
        <h1>Hello App</h1>
        <input type='checkbox' id='showPersons' onChange={this.toggleShowingPersons}/>
        <label htmlFor='showPersons'> Hide persons.</label>
        {persons}
      </header>
    </div>;
  }
}

export default App;
