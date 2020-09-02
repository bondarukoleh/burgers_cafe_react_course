import React, {Component} from 'react';
import personStyles from './Person.module.css';
import buttonStyles from '../../../css/Button.module.css';

/* Example os styled-components usage
import styled, {css} from 'styled-components';

const Button = styled.button`
  background: white;
  cursor: pointer;

  &:hover {
    background: #3a5695;
    color: #fff;
  };
  ${props => props.primary && css`
    background: red;
    color: white;
    &:hover {
      background: white;
      color: red;
    }`}
`;
*/

class Person extends Component {
  /* using hooks
  const [personState, setPersonState] = useState({name: props.name, age: props.age});
   const [personHobbies] = useState(props.children);
  */

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate PERSON', this.props.name)
    return nextProps.name !== this.props.name;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate PERSON', this.props.name)
    return {snapshot: 'returned from getSnapshotBeforeUpdate'};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate PERSON', this.props.name)
    console.log(snapshot)
  }

  render() {
    console.log('Render from PERSON', this.props.name)
    return <div className={personStyles.person}>
      <label htmlFor={`set_${this.props.id}`}>To reset the name </label>
      <input type="text" id={`set_${this.props.id}`}/>
      <button key={1} className={buttonStyles.btn} onClick={this.props.handleSetName}>Set the name</button>
      <p>My name is {this.props.name}! I'm {this.props.age} years old.</p>
      <p>My hobbies are: {this.props.children.join(', ')}.</p>
      <button className={`${buttonStyles.btn} ${buttonStyles.primary}`} key={2}
              onClick={this.props.deleteButtonHandler}>Delete person
      </button>
    </div>;
  }
}

export default Person;