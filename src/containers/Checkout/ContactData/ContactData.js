import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import styles from './ContactData.module.scss';
import {ordersRequest} from "../../../helpers/api";
import Spinner from "../../../components/Burger/Spinner/Spinner";

const ContactData = props => {
  const [state, setState] = useState({
    name: 'Oleh',
    email: 'test@test.com',
    address: {
      street: 'Test street 1',
      zipCode: '1111AB',
      country: 'Netherlands'
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
        <input type="email" placeholder={'Your email...'}/>
        <input type="text" placeholder={'Your name...'}/>
        <input type="text" placeholder={'Your address...'}/>
        <input type="text" placeholder={'Postal code...'}/>
        <Button buttonType={'Fail'} clickHandler={props.orderCanceled}>Cancel</Button>
        <Button buttonType={'Success'} clickHandler={createOrder}>Order</Button>
      </form>
    </div>
  )

  return state.loading ? <Spinner/> : renderForm();
};

ContactData.propTypes = {
  orderCanceled: PropTypes.func.isRequired,
  orderMade: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired
};

export default withRouter(ContactData);