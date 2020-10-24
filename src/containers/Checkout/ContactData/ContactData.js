import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import styles from './ContactData.module.scss';
import {ordersRequest} from "../../../helpers/api";
import Spinner from "../../../components/Burger/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = props => {
  const [form, setForm] = useState({
    name: {
      elementProps: {
        type: 'text',
      },
      label: 'Your Name',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    email: {
      elementProps: {
        type: 'text',
      },
      label: 'Your email',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    street: {
      elementProps: {
        type: 'text',
      },
      label: 'Your Street',
      inputType: 'input',
      value: '',
      validation: {
        required: true
      }
    },
    postalCode: {
      elementProps: {
        type: 'text',
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
  const [loading, setLoading] = useState(false);

  const createOrder = async (e) => {
    e.preventDefault();
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: Object.entries(form).reduce((customerObj, [dataKey, data]) => {
        customerObj[dataKey] = data.value;
        return customerObj;
      }, {}),
    };

    setLoading(true);
    try {
      const result = await ordersRequest.post('/orders.json', order);
      setLoading(false);
      props.history.push('/');
      console.log(result);
    } catch (e) {
      setLoading(false);
      console.log(`Couldn't post the order `, e.message);
    }
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
          <Button buttonType={'Success'} clickHandler={(e) => {
            e.preventDefault();
            console.log(form);
          }}>Print</Button>
          <Button buttonType={'Fail'} clickHandler={props.orderCanceled}>Cancel</Button>
          <Button buttonType={'Success'} type='submit'>Order</Button>
        </form>
      </div>
    );
  };

  return loading ? <Spinner/> : renderForm();
};

ContactData.propTypes = {
  orderCanceled: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};

export default withRouter(ContactData);