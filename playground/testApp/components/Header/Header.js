import React, {useRef, useEffect, useContext} from 'react';
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
  const authContext = useContext(AuthContext);

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
      <button onClick={authContext.loginHandle}>Click to log in</button>
    </header>
  );
};

export default React.memo(Header);