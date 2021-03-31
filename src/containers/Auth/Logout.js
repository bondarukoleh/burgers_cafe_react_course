import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {authContext} from '../../context/auth'

const Logout = () => {
  const {logoutUser} = useContext(authContext);
  useEffect(() => {
    logoutUser();
    // props.history.push('/'); We can do it like this
  }, [logoutUser])

  return (
    <div>
      {/* But also we can try to redirect like this */}
      <Redirect to='/'/>
    </div>
  );
};

export default Logout;
