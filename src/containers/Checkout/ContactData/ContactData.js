import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import styles from './ContactData.module.scss';
import Spinner from "../../../components/Burger/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {sendOrder} from "../../../store/actions/orderActionCreator";
import {connect} from "react-redux";

const ContactData = props => {
  const [form, setForm] = useState({
    street: {
      elementProps: {
        type: 'text',
        required: true
      },
      label: 'Street',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    postalCode: {
      elementProps: {
        type: 'text',
        required: true
      },
      label: 'Postal code',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    country: {
      elementProps: {
        type: 'text',
        required: true
      },
      label: 'Country',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    deliveryMethod: {
      elementProps: {
        options: [
          {value: 'fast', displayValue: 'Faster, expensive'},
          {value: 'slow', displayValue: 'Slower, cheaper'},
        ]
      },
      label: 'Delivery method',
      inputType: 'select',
      value: 'fast'
    }
  });

  const createOrder = async (e) => {
    e.preventDefault();
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: Object.entries(form).reduce((customerObj, [dataKey, data]) => {
        customerObj[dataKey] = data.value;
        return customerObj;
      }, {}),
      userID: props.user.localId
    };
    await props.sendTheOrder(props.user.idToken, {id: Math.floor(Math.random() * 10000), order})
    props.history.push('/');
  };

  const inputChangeHandler = (e, inputName) => {
    const newForm = {...form};
    const newFormElement = {...newForm[inputName]};
    newFormElement.value = e.target.value;
    newFormElement.valid = validationCheck(newFormElement.value, newFormElement.validation);
    newForm[inputName] = newFormElement;
    setForm(newForm);
  };

  const validationCheck = (value, rules) => {
    let validValue = false;
    if (rules.required) {
      validValue = !!value;
    }
    return validValue;
  };

  const renderForm = () => {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data:</h4>
        <form onSubmit={createOrder}>
          {Object.entries(form).map(([key, value]) => {
            return <Input
              key={key}
              inputType={value.inputType}
              label={value.label}
              changed={(e) => inputChangeHandler(e, key)}
              elementProps={value.elementProps}
              valid={value.valid}
            />
          })}
          <Button buttonType={'Fail'} clickHandler={props.orderCanceled}>Cancel</Button>
          <Button buttonType={'Success'} type='submit'>Order</Button>
        </form>
      </div>
    );
  };

  return props.loading ? <Spinner/> : renderForm();
};

ContactData.propTypes = {
  orderCanceled: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
};

const mapStateToProps = (store) => {
  return {
    loading: store.order.loading,
    user: store.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTheOrder: (token, {id, order, userId}) => dispatch(sendOrder(token, {userId, id, order})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
