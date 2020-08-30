import React from "react";
import Person from "./Person/Person";

const persons = (props) => {

  const deletePerson = (personId) => {
    const persons = [...props.persons];
    const indexToDelete = persons.findIndex(({id}) => id === personId);
    if (indexToDelete !== -1) {
      persons.splice(indexToDelete, 1);
      this.setState({persons});
    }
  };

  const renderPersons = () => {
    const {showPersons} = props;
    let persons = null;
    if (showPersons) {
      persons = <div className="person-wrap">
        {
          props.persons
            .map(({name, age, hobbies, id}) =>
              <Person
                key={id}
                name={name}
                age={age}
                deleteButtonHandler={() => deletePerson(id)}>{hobbies}</Person>)
        }
      </div>;
    }
    return persons;
  };

  return renderPersons();
};

export default persons;