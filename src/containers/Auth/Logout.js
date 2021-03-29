import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logoutUserInitiated} from "../../store/actions/AuthActionCreator";

const Logout = ({logoutUser}) => {
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

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUserInitiated)
  };
};

export default connect(null, mapDispatchToProps)(Logout);
