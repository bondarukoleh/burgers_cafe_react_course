import React, {useState} from 'react';
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.scss';
import {loginUser} from '../../store/actions/AuthActionCreator';

const Auth = props => {
  const [form, setForm] = useState({
    email: {
      elementProps: {
        type: 'email',
        required: true
      },
      label: 'Your email',
      inputType: 'input',
      value: '',
    },
    password: {
      elementProps: {
        type: 'password',
        required: true
      },
      label: 'Your Password',
      inputType: 'input',
      value: '',
      validation: {
        minLength: 6
      }
    },
  });
  const [userState, setUserState] = useState({signIn: null});

  const inputChangeHandler = (e, inputName) => {
    const newForm = {...form};
    const newFormElement = {...newForm[inputName]};
    newFormElement.value = e.target.value;
    newFormElement.valid = validationCheck(newFormElement.value, newFormElement.validation);
    newForm[inputName] = newFormElement;
    setForm(newForm);
  };

  const validationCheck = (value, rules) => {
    let isValid = false;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = !!value && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

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
      {Object.entries(form).map(([key, value]) => {
        return <Input
          key={key}
          inputType={value.inputType}
          label={value.label}
          changed={(e) => inputChangeHandler(e, key)}
          elementProps={value.elementProps}
          valid={value.valid}
        />;
      })}
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
    loginAUser: (userData, signIn) => dispatch(loginUser(userData, signIn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);