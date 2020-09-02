import React from "react";
import Person from "./Person/Person";

const Persons = (props) => {
  const renderPersons = () => {
    const {showPersons} = props;
    let persons = null;
    if (showPersons) {
      persons = <div className="person-wrap">
        {
          props.persons
            .map(({name, age, hobbies, id}) => {
              return <Person
                key={id}
                name={name}
                age={age}
                id={id}
                deleteButtonHandler={() => props.deletePerson(id)  } handleSetName={(e) => props.handleSetName(e, id)}>{hobbies}</Person>
            })
        }
      </div>;
    }
    return persons;
  };
  return renderPersons();
};

export default Persons;