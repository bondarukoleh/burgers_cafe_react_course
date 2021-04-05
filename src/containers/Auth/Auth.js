import React, {useState} from 'react';
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.scss';
import {loginUser} from '../../store/actions/AuthActionCreator';
import {errorOccurred} from '../../store/actions/errorActionCreator';
import WithErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import {axiosRequest} from "../../helpers/api";

const Auth = props => {
  const [form, setForm] = useState({
    email: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const [userState, setUserState] = useState({signIn: null});

  const emailChangeHandler = (e) => {
    const newForm = {...form};
    const newFormElement = {...newForm.email};
    newFormElement.value = e.target.value;
    newForm.email = newFormElement;
    setForm(newForm);
  }

  const passChangeHandler = (e) => {
    const newForm = {...form};
    const newFormElement = {...newForm.password};
    newFormElement.value = e.target.value;
    newForm.password = newFormElement;
    setForm(newForm);
  }

  const authenticate = async (e) => {
    e.preventDefault();
    const userData = {
      email: form.email.value,
      password: form.password.value
    };
    await props.loginAUser(userData, userState.signIn);
    props.history.push('/');
  };

  const renderChooseUserState = () => {
    return <div>
      <Button
        clickHandler={() => setUserState({signIn: false})}
        className={'Success'}
      >Sign up</Button>
      or
      <Button
        className={'Success'}
        clickHandler={() => setUserState({signIn: true})}
      >Sign in</Button>
    </div>;
  };

  const renderForm = () => {
    return <form onSubmit={authenticate}>
      <Input
        inputType={'input'}
        label={'Your email'}
        changed={emailChangeHandler}
        required={true}
        elementProps={{type: 'email', required: true}}
        valid={form.email.valid}
      />
      <Input
        inputType={'input'}
        label={'Your password'}
        changed={passChangeHandler}
        elementProps={{type: 'password', required: true, minLength: 6}}
        valid={form.password.valid}
      />
      <Button buttonType={'Success'} type='submit'>{userState.signIn ? 'Sign in' : 'Sign up'}</Button>
    </form>;
  };

  return (
    <div className={styles.Auth}>
     {userState.signIn === null ? renderChooseUserState() : renderForm()}
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
