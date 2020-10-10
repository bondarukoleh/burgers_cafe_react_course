import React from 'react';
import PropTypes from 'prop-types';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = props => {
  return (
    <div>
      <CheckoutSummary ingredients={}/>
    </div>
  );
};

Checkout.propTypes = {

};

export default Checkout;
