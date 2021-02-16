import React, {PureComponent} from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {

  /* Don't need this because of PureComponent */
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return nextProps.persons !== this.props.persons || nextProps.showPersons !== this.props.showPersons;
  // }

  renderPersons = () => {
    const {showPersons} = this.props;
    let persons = null;
    if (showPersons) {
      persons = <div className="person-wrap">
        {
          this.props.persons
            .map(({name, age, hobbies, id}) => {
              return (
                <Person
                  key={id}
                  name={name}
                  age={age}
                  id={id}
                  deleteButtonHandler={() => this.props.deletePerson(id)}
                  handleSetName={(e) => this.props.handleSetName(e, id)}>
                  {hobbies}
                </Person>
              );
            })
        }
      </div>;
    }
    return persons;
  };

  render() {
    return this.renderPersons();
  }
}

export default Persons;