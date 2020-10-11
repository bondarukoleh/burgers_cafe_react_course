import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from "../../../components/UI/Button/Button";

const ContactData = props => {
  const [user, setUser] = useState({
    name: 'Oleh',
    email: 'test@test.com',
    address: {
      street: 'Test street 1',
      zipCode: '1111AB',
      country: 'Netherlands'
    }
  });

  return (
    <div>
      <h4>Enter your contact data:</h4>
      <form>
        <input type="email" placeholder={'Your email...'}/>
        <input type="text" placeholder={'Your name...'}/>
        <input type="text" placeholder={'Your address...'}/>
        <input type="text" placeholder={'Postal code...'}/>
        <Button buttonType={'Fail'} clickHandler={props.orderCanceled}>Cancel</Button>
        <Button buttonType={'Success'} clickHandler={props.orderMade}>Order</Button>
      </form>
    </div>
  );
};

ContactData.propTypes = {
  orderCanceled: PropTypes.func.isRequired,
  orderMade: PropTypes.func.isRequired
};

export default ContactData;