import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import styles from './ContactData.module.scss';
import {ordersRequest} from "../../../helpers/api";
import Spinner from "../../../components/Burger/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = props => {
  const [state, setState] = useState({
    form: {
      name: {
        elementProps: {
          type: 'text',
        },
        label: 'Your Name',
        inputType: 'input',
        value: ''
      },
      email: {
        elementProps: {
          type: 'text',
        },
        label: 'Your email',
        inputType: 'input',
        value: ''
      },
      street: {
        elementProps: {
          type: 'text',
        },
        label: 'Your Street',
        inputType: 'input',
        value: ''
      },
      postalCode: {
        elementProps: {
          type: 'text',
        },
        label: 'Postal code',
        inputType: 'input',
        value: ''
      },
      country: {
        elementProps: {
          type: 'text',
        },
        label: 'Country',
        inputType: 'input',
        value: ''
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
        value: ''
      },
    },
    loading: false
  });


  const createOrder = async () => {
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: state.customer,
    };

    setState({loading: true});
    try {
      const result = await ordersRequest.post('/orders.json', order);
      setState({loading: false});
      props.history.push('/');
      console.log(result);
    } catch (e) {
      setState({loading: false});
      console.log(`Couldn't post the order `, e.message);
    }
  };

  const renderForm = () => (
    <div className={styles.ContactData}>
      <h4>Enter your contact data:</h4>
      <form>
        {Object.entries(state.form).map(([key, value]) => {
          return <Input key={key} inputType={value.inputType} label={value.label} elementProps={value.elementProps} />
        })}
        <Button buttonType={'Fail'} clickHandler={props.orderCanceled}>Cancel</Button>
        <Button buttonType={'Success'} clickHandler={createOrder}>Order</Button>
      </form>
    </div>
  );

  return state.loading ? <Spinner/> : renderForm();
};

ContactData.propTypes = {
  orderCanceled: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired
};

export default withRouter(ContactData);