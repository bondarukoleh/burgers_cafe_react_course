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
    await props.loginAUser(userData);
    props.history.push('/');
  };

  return (
    <div className={styles.Auth}>
      <form onSubmit={authenticate}>
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
        <Button buttonType={'Success'} clickHandler={(e) => {
          e.preventDefault();
          console.log(form);
        }}>Print</Button>
        <Button buttonType={'Success'} type='submit'>Login</Button>
      </form>
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
    loginAUser: (userData) => dispatch(loginUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);