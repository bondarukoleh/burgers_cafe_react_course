import React, {useRef, useEffect} from 'react';
import AuthContext from "../../context/authContext";

const Header = (props) => {
  // useEffect(() => {
  //   console.log('HEADER showPersons changed')
  // }, [props.showPersons])
  // useEffect(() => {
  //   return () => {
  //     console.log('HEADER will be unmount')
  //   }
  // })

  const toggle = useRef(null);
  useEffect(() => {
    /* componentDidMount */
    toggle.current.click();
  }, [])

  const hideStyle = () => ({background: `${props.showPersons ? 'lightgreen' : '#c06c6c'}`});

  return (
    <header className="App-header">
      <h1>Hello App</h1>
      <input ref={toggle} type='checkbox' id='showPersons' onChange={props.hidePersonsHandler}/>
      <label htmlFor='showPersons' style={hideStyle()}> Hide persons.</label>
      <br/>
      <AuthContext.Consumer>
        {(context) => <button onClick={context.loginHandle}>Click to log in</button>}
      </AuthContext.Consumer>
    </header>
  );
};

export default React.memo(Header);