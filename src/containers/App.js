import React, {Component} from 'react';
import '../css/App.css';
import Persons from "../components/Persons/Persons";
import Header from '../components/Header/Header';

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

  render() {
    return <div className="App">
      <p>{this.props.title}</p>
      <Header hidePersonsHandler={this.toggleShowingPersons} showPersons={this.state.showPersons}/>
      <main>
        <Persons persons={this.state.persons} showPersons={this.state.showPersons}/>
      </main>
    </div>;
  }
}

export default App;
