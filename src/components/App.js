import React, {Component} from 'react';
import '../css/App.css';
import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

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
    const persons = [...this.state.persons];
    const indexToDelete = persons.findIndex(({id}) => id === personId);
    if(indexToDelete !== -1) {
      persons.splice(indexToDelete, 1);
      this.setState({persons});
    }
  };

  renderPersons = () => {
    const {showPersons} = this.state;
    let persons = null;
    if (showPersons) {
      persons = <div className="person-wrap">
        {
          this.state.persons
            .map(({name, age, hobbies, id}) =>
              <ErrorBoundary key={id}><Person
                name={name}
                age={age}
                deleteButtonHandler={() => this.deletePerson(id)}>{hobbies}</Person></ErrorBoundary>)
        }
      </div>;
    }
    return persons;
  };

  hideStyle = () => ({background: `${this.state.showPersons ? 'lightgreen' : '#c06c6c'}`})

  render() {
    return <div className="App">
      <header className="App-header">
        <h1>Hello App</h1>
        <input type='checkbox' id='showPersons' onChange={this.toggleShowingPersons}/>
        <label htmlFor='showPersons' style={this.hideStyle()}> Hide persons.</label>
        {this.renderPersons()}
      </header>
    </div>;
  }
}

export default App;
