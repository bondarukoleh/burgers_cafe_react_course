import React, {Component} from 'react';
import '../css/App.css';
import Persons from "../components/Persons/Persons";

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

  hideStyle = () => ({background: `${this.state.showPersons ? 'lightgreen' : '#c06c6c'}`});

  render() {
    return <div className="App">
      <header className="App-header">
        <h1>Hello App</h1>
      </header>
      <main>
        <input type='checkbox' id='showPersons' onChange={this.toggleShowingPersons}/>
        <label htmlFor='showPersons' style={this.hideStyle()}> Hide persons.</label>
        <Persons persons={this.state.persons} showPersons={this.state.persons} />
      </main>
    </div>;
  }
}

export default App;
