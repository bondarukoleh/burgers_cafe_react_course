import React, {useState} from 'react';
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.scss';
import {loginUser} from '../../store/actions/AuthActionCreator';
import {errorOccurred} from '../../store/actions/errorActionCreator';
import WithErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import {axiosRequest} from "../../helpers/api";
import {Link} from "react-router-dom";

const Auth = props => {
  const [form, setForm] = useState({
    email: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const [userSignIn, setUserSignIn] = useState(true);

  const inputChangeHandler = (e, key) => {
    const newForm = {...form};
    const newFormElement = {...newForm[key]};
    newFormElement.value = e.target.value;
    newForm[key] = newFormElement;
    setForm(newForm);
  }

  const authenticate = async (e) => {
    e.preventDefault();
    const userData = {
      email: form.email.value,
      password: form.password.value
    };
    await props.loginAUser(userData, userSignIn);
  };

  const renderForm = () => {
    return <form onSubmit={authenticate}>
      <Input
        inputType={'input'}
        label={'Your email'}
        changed={(e) => inputChangeHandler(e, 'email')}
        required={true}
        elementProps={{type: 'email', required: true}}
        valid={form.email.valid}
      />
      <Input
        inputType={'input'}
        label={'Your password'}
        changed={(e) => inputChangeHandler(e, 'password')}
        elementProps={{type: 'password', required: true, minLength: 6}}
        valid={form.password.valid}
      />
      <Button buttonType={'Success'} type='submit'>{userSignIn ? 'Sign in' : 'Sign up'}</Button>
      <Link
        onClick={() => setUserSignIn(prevState => !prevState)}
        to={'/auth'}
      >{`Maybe, ${userSignIn ? 'sign up' : 'sign in'}`}?</Link>
    </form>;
  };

  return (
    <div className={styles.Auth}>
     {renderForm()}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    error: store.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAUser: (userData, signIn) => dispatch(loginUser(userData, signIn)),
    someErrorOccurred: (e) => dispatch(errorOccurred(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Auth, axiosRequest));
