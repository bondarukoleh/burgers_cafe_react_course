import React, {Component} from 'react';
import classes from '../css/App.css';
import Persons from "../components/Persons/Persons";
import Header from '../components/Header/Header';
import WithClass from "../components/hoc/WithClasshoc";
import withClasshocFunc from "../components/hoc/withClasshocFunc";
import AuthContext from "../context/authContext";

class App extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps. state and props: ', state, props)
  //   return state;
  // }

  state = {
    showPersons: true,
    persons: [
      {id: 'oleh', name: "Oleh", age: 30, hobbies: ['Programming', 'Bicycling', 'Guitar']},
      {id: 'vasia', name: "Vasia", age: 24, hobbies: ['Beer', 'Movies', 'Music']}
    ],
    authenticated: false
  };

  toggleShowingPersons = function (e) {
    this.setState({showPersons: !e.target.checked});
  }.bind(this);

  deletePerson = (personId) => {
    const persons = [...this.state.persons];
    const indexToDelete = persons.findIndex(({id}) => id === personId);
    if (indexToDelete !== -1) {
      persons.splice(indexToDelete, 1);
      this.setState({persons});
    }
  };

  handleSetName = (e, personId) => {
    const input = document.querySelector(`#set_${personId}`);
    console.log(input);
    if (!input.value) {
      return;
    }
    const persons = [...this.state.persons];
    const personToChangeIndex = persons.findIndex(({id}) => id === personId);
    persons[personToChangeIndex].name = input.value;
    this.setState({persons});
    input.value = '';
  };

  loginHandle = (e) => {
    console.log('Checking login.')
    this.setState({authenticated: true})
  }

  render() {
    return (
      <WithClass classes={"App"}>
        <p>{this.props.title}</p>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, loginHandle: this.loginHandle}}>
          <Header
            hidePersonsHandler={this.toggleShowingPersons}
            showPersons={this.state.showPersons}
          />
          <main>
            <Persons
              persons={this.state.persons}
              showPersons={this.state.showPersons}
              deletePerson={this.deletePerson}
              handleSetName={this.handleSetName}
            />
          </main>
        </AuthContext.Provider>
      </WithClass>
    );
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return true;
  // }
  //
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('componentDidUpdate APP');
  // }
}

/* You can use it in different ways */
// export default App;
export default withClasshocFunc(App, classes.App);
